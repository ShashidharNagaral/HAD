import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPatientList } from "../services/receptionistServices";
import { searchPatient, getDoctorList } from "../services/receptionistServices";
import { addPatientAppointment } from "../services/receptionistServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import TextField from "@mui/material/TextField";
import SelectModal from "../components/SelectModal";
import { handleAuthentication } from "../utils/authentication";
import { logout } from "../utils/authentication";
import ConfirmModal from "../components/ConfirmModal";
import { getValueForKey } from "../utils/localStorage";

function RDashboard() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [searchedPatientList, setSearchedPatientList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [doctorID, setDoctorID] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [receptionistId, setReceptionistId] = useState(null);
  const [modalIndex, setModalIndex] = useState(-1);
  const [appointmentAdded, setAppointmentAdded] = useState(false);
  const [modal, setModal] = useState(false);

  function addPatient() {
    navigate("/patient-registration");
  }

  function updatePassword(event) {
    event.preventDefault();
    navigate("/update-password", {
      state: {
        employeeId: receptionistId,
      },
    });
  }

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
    setReceptionistId(state.r_id);
    (async function () {
      try {
        const responseData = await getAllPatientList();
        const data = responseData.data;
        console.log(data);
        if (data) {
          setPatientList(
            data.filter((e) => {
              return e.treated === false;
            })
          );
        }
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login", toast);
      }
    })();

    (async function getDoctors() {
      try {
        const responseData = await getDoctorList();
        let doctorListData = responseData.data;
        console.log(doctorListData);
        if (doctorListData) {
          setDoctorList(doctorListData);
        }
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login", toast);
      }
    })();
  }, [state.r_id, appointmentAdded, navigate]);

  async function addAppointment(p_id) {
    // add appointment for patient using pid
    if (doctorID === null) {
      alert("Doctor not selected");
    } else {
      try {
        const responseData = await addPatientAppointment(p_id, doctorID);
        const appointmentData = responseData.data;
        console.log(appointmentData);
        if (appointmentData) {
          toast.success(`Appointment ID: ${appointmentData.a_id} generated!`);
          setAppointmentAdded((pv) => !appointmentAdded);
        } else {
          toast.error(`Unable to generate Appointment`);
        }
        closeModal();
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login", toast);
      }
    }
    setDoctorID(null);
  }

  function handleChangeInDoctor(event) {
    event.preventDefault();
    const value = event.target.value;

    console.log("value", value);
    setDoctorID(value);
  }

  function onUpdatePatientData(searchedPatientObj) {
    navigate("/update-patient-details", {
      state: {
        patientObj: searchedPatientObj,
      },
    });
  }
  function openModal(index) {
    setModalIndex(index);
  }
  function closeModal() {
    setDoctorID(null);
    setModalIndex(-1);
  }

  function openConfirmModal() {
    setModal(true);
  }
  function closeConfirmModal() {
    setModal(false);
  }

  function searchBarOnChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setSearchValue(value);
    // api call to get list
    if (value !== "") {
      (async function getSearchedPatientList() {
        try {
          if (!/^([A-Za-z0-9]{0,})$/.test(value)) {
            alert("Enter A-Z, a-z, 0-9 characters only!");
            setSearchValue("");
          } else {
            const responseData = await searchPatient(value);
            let searchedPatientList = responseData.data;
            if (searchedPatientList) {
              console.log(searchedPatientList);
              setSearchedPatientList(searchedPatientList);
            }
          }
        } catch (error) {
          handleAuthentication(error.response, navigate, "/login", toast);
        }
      })();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
      }}
    >
      <div
        style={{
          flex: 2,
          height: "100vh",
          width: "300px",
          backgroundColor: "#516395",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="button2" onClick={updatePassword}>
          Update Profile
        </button>
        <button className="button2" onClick={addPatient}>
          Add Patient
        </button>
        <button
          className="button2"
          onClick={() => {
            openConfirmModal();
          }}
        >
          Logout
        </button>
        {modal && (
          <ConfirmModal
            onSubmit={logout}
            param1={navigate}
            param2={"/login"}
            closeModal={closeConfirmModal}
            submitText={"Logout"}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          padding: "8px",
          flex: 10,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label className="tableHeading">
            Upcoming Patients: {patientList.length}
          </label>
          <div className="search">
            <TextField
              name="Patient Search"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search Patients"
              onChange={searchBarOnChange}
              placeholder="Search Patient by name or mobile number"
              value={searchValue}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <div
            className="table-wrapper"
            style={{
              flex: 1,
              marginRight: "4px",
              height: "100%",
              maxHeight: "700px",
              overflowY: "scroll",
            }}
          >
            <table
              style={{
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <th>Appointment No.</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Doctor</th>
                </tr>
              </tbody>
              <tbody style={{ flex: "1" }}>
                {patientList.map((e, i) => {
                  return (
                    <tr key={i}>
                      <th>{e.a_id}</th>
                      <th>{e.patient.name}</th>
                      <th>{e.patient.age}</th>
                      <th>{e.patient.gender}</th>
                      <th>{e.doctor.name}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "4px",
              }}
            >
              <div
                className="table-wrapper"
                style={{
                  height: "100%",
                  maxHeight: "350px",
                  overflowY: "scroll",
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                    </tr>
                  </tbody>
                  <tbody
                    style={{
                      flex: "1",
                    }}
                  >
                    {searchedPatientList.map((e, i) => {
                      return (
                        <tr key={i}>
                          <th>{e.name}</th>
                          <th>{e.age}</th>
                          <th>{e.gender}</th>
                          <td>
                            <div>
                              <button
                                onClick={() => {
                                  openModal(i);
                                }}
                              >
                                {" "}
                                Add Appointment
                              </button>

                              {modalIndex === i && (
                                <SelectModal
                                  key={i}
                                  list={doctorList}
                                  data={e}
                                  submitButton={addAppointment}
                                  closeModal={closeModal}
                                  handleOptionChange={handleChangeInDoctor}
                                  heading={"Select Doctor"}
                                  buttonName={"CONFIRM"}
                                />
                              )}
                            </div>
                          </td>
                          <td>
                            <button
                              className="button"
                              value={i}
                              onClick={() => onUpdatePatientData(e)}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div style={{ alignSelf: "flex-end" }}>
                <label className="tableHeading">Doctor List</label>
              </div>
              <div
                className="table-wrapper"
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                }}
              >
                <table
                  style={{
                    width: "100%",
                  }}
                >
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Specialization</th>
                    </tr>
                  </tbody>
                  <tbody
                    style={{
                      flex: "1",
                    }}
                  >
                    {doctorList.map((e, i) => {
                      return (
                        <tr key={i}>
                          <th>{e.name}</th>
                          <th>{e.specialization}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RDashboard;

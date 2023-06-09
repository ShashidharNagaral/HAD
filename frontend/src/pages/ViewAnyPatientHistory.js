import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getPatientList } from "../services/doctorServices";
import { handleAuthentication } from "../utils/authentication";
import { getValueForKey } from "../utils/localStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewAnyPatientHistory() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [doctorID, setDoctorID] = useState(null);
  const [searchedPatientList, setSearchedPatientList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
    setDoctorID(state.d_id);
  }, [state.d_id, navigate]);

  function searchBarOnChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setSearchValue(value);
    // api call to get list
    if (value !== "") {
      (async function getsearchedPatientList() {
        try {
          if (!/^([A-Za-z]{0,})$/.test(value)) {
            alert("Enter A-Z, a-z characters only!");
            setSearchValue("");
          } else {
            const responseData = await getPatientList(doctorID, value);
            const patientList = responseData.data;
            if (patientList) {
              console.log(patientList);
              setSearchedPatientList(patientList);
            }
          }
        } catch (error) {
          handleAuthentication(error.response, navigate, "/login", toast);
        }
      })();
    }
  }

  function onViewHistoryButtonClicked(p) {
    navigate("/patient-medical-history", {
      state: {
        patientObj: p,
        doctorID: doctorID,
      },
    });
  }

  return (
    <div>
      <div className="search" style={{ padding: "12px" }}>
        <TextField
          name="Patient Search"
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search for patient using name"
          onChange={searchBarOnChange}
          value={searchValue}
        />
      </div>
      {/* TODO: Change gender to display full form */}
      <div className="paddingPage">
        <table>
          <tbody>
            <tr>
              <th>Patient Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </tbody>
          <tbody>
            {searchedPatientList.map((p, i) => {
              return (
                <tr key={i}>
                  <th>{p.pid}</th>
                  <th>{p.name}</th>
                  <th>{p.gender}</th>
                  <th>{p.age}</th>
                  <td>
                    <button
                      className="button"
                      value={i}
                      onClick={() => onViewHistoryButtonClicked(p)}
                    >
                      View History
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ViewAnyPatientHistory;

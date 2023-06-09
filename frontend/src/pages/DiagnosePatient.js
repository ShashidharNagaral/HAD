import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { writeDiagnosis, submitFollowUp } from "../services/doctorServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DiagnoseContext,
  resetDiagnoseData,
} from "../contexts/DiagnoseContext";
import {
  resetFollowupData,
  WriteFollowUpContext,
} from "../contexts/WriteFollowUpContext";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { handleAuthentication } from "../utils/authentication";
import ConfirmModal from "../components/ConfirmModal";
import { getValueForKey } from "../utils/localStorage";

function DiagnosePatient() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [appointmentID, setAppointmentID] = useState(null);
  const [patientObj, setPatientObj] = useState({});
  const [doctorID, setDoctorID] = useState(null);
  const [writtenData, setWrittenData] = useContext(DiagnoseContext);
  const [followUpDetails, setFollowUpDetails] =
    useContext(WriteFollowUpContext);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
    setAppointmentID(state.a_id);
    setPatientObj(state.patientObj);
    setDoctorID(state.doctorID);
  }, [state.a_id, state.patientObj, state.doctorID, navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setWrittenData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }
  function viewPatientHistory() {
    console.log(appointmentID);
    console.log(patientObj);
    navigate("/patient-medical-history", {
      state: {
        doctorID: doctorID,
        patientObj: patientObj,
      },
    });
  }

  function writeFollowUp() {
    navigate("/write-follow-up");
  }

  async function onSubmit() {
    console.log(writtenData);
    try {
      const responseData = await writeDiagnosis(appointmentID, writtenData);
      const Ddata = responseData.data;
      if (Ddata) {
        setWrittenData(resetDiagnoseData);
        // TODO: find out the best condition for below, visitCount != "" is a temporary solution
        if (followUpDetails.visitCount !== "") {
          console.log(followUpDetails);
          try {
            setLoading(true);
            const responseData = await submitFollowUp(
              appointmentID,
              followUpDetails
            );
            setLoading(false);
            const wData = responseData.data;
            if (wData) {
              setFollowUpDetails(resetFollowupData);
              console.log(wData);
              toast.success(
                `Diagnosis and Prescription Written and FollowUp Added`
              );
              navigate(-1);
            } else {
              toast.error(
                "Unable to write Diagnosis and Prescription / follow up"
              );
            }
          } catch (error) {
            handleAuthentication(error.response, navigate, "/login", toast);
          }
        } else {
          toast.success(`Diagnosis and Prescription Written`);
          navigate(-1);
        }
      } else {
        toast.error("Unable to write Diagnosis and Prescription");
      }
    } catch (error) {
      handleAuthentication(error.response, navigate, "/login", toast);
    }
  }
  function openConfirmModal(event) {
    event.preventDefault();
    setModal(true);
  }
  function closeConfirmModal() {
    setModal(false);
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Diagnosis and Prescription</div>
        <div className="content">
          <form onSubmit={openConfirmModal}>
            {modal && (
              <ConfirmModal
                onSubmit={onSubmit}
                closeModal={closeConfirmModal}
                submitText={"Submit"}
              />
            )}
            <div className="user-details">
              <div className="input-box">
                <span className="details">Diagnosis</span>
                <textarea
                  name="diagnosis"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={writtenData.diagnosis}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <span className="details">Prescription</span>
                <textarea
                  name="prescription"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={writtenData.prescription}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <span className="details">Remarks</span>
                <textarea
                  name="remarks"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={writtenData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button">
              <input
                onClick={viewPatientHistory}
                type="button"
                value="View Patient History"
              />
            </div>

            <div className="button">
              <input
                onClick={writeFollowUp}
                type="button"
                value="Write FollowUp"
              />
            </div>

            <div className="button">
              <input type="submit" value="SUBMIT" />
            </div>
          </form>
          {loading && <LoadingIndicator />}
        </div>
      </div>
    </div>
  );
}
export default DiagnosePatient;

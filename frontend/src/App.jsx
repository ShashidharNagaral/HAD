import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PatientRegistration from "./pages/PatientRegistration";
import RDashboard from "./pages/RDashboard";
import DDashboard from "./pages/DDashboard";
import ADashboard from "./pages/ADashboard";
import EmployeeRegistration from "./pages/EmployeeRegistration";
import UpdateEmployeeDetails from "./pages/UpdateEmployeeDetails";
import UpdatePatientDetails from "./pages/UpdatePatientDetails";
import DiagnosePatient from "./pages/DiagnosePatient";
import WriteFollowUp from "./pages/WriteFollowUp";
import ViewAnyPatientHistory from "./pages/ViewAnyPatientHistory";
import PatientMedicalHistory from "./pages/PatientMedicalHistory";
import SDashboard from "./pages/SDashboard";
import VisitsDueByFieldWorker from "./pages/VisitsDueByFieldWorker";
import ViewNewVisitRecords from "./pages/ViewNewVisitRecords";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import { WriteFollowUpProvider } from "./contexts/WriteFollowUpContext";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/receptionist-dashboard" element={<RDashboard />} />
      <Route path="/doctor-dashboard" element={<DDashboard />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/admin-dashboard" element={<ADashboard />} />
      <Route path="/employee-registration" element={<EmployeeRegistration />} />
      <Route
        path="/update-patient-details"
        element={<UpdatePatientDetails />}
      />
      <Route
        path="/update-employee-details"
        element={<UpdateEmployeeDetails />}
      />
      <Route
        path="/view-any-patient-history"
        element={<ViewAnyPatientHistory />}
      />
      <Route
        path="/patient-medical-history"
        element={<PatientMedicalHistory />}
      />
      <Route path="/diagnose-patient" element={<DiagnosePatient />} />
      <Route path="/write-follow-up" element={<WriteFollowUp />} />

      <Route path="/supervisor-dashboard" element={<SDashboard />} />
      <Route
        path="/visits-due-by-fieldworker"
        element={<VisitsDueByFieldWorker />}
      />
      <Route path="/view-new-visit-records" element={<ViewNewVisitRecords />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

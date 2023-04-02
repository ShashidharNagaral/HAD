package com.example.project3.services.impl;

import com.example.project3.entities.*;
import com.example.project3.repo.*;
import com.example.project3.services.FieldWorkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FieldWorkerServicesImpl implements FieldWorkerServices {
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private FollowupRepo followupRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private VisitRepo visitRepo;
    @Autowired
    private MedicalRepo medicalRepo;
    @Override
    public List<VisitModel> getAppointmentListFW(Integer fid) {
        Employee employee = this.employeeRepo.findById(fid).orElseThrow();
        List<Patient> patients = this.patientRepo.findPatientByFieldworker(employee);
        List<Appointment> finalAppointments=new ArrayList<Appointment>();
        for(Patient p:patients)
        {
            List<Appointment> appointments = this.appointmentRepo.findByPatient(p);
            for (Appointment appointment : appointments) {
                appointment.setDiagnostics(null);
                appointment.setDoctor(null);
                if (appointment.getFollowupRemaining() == false) {
                    appointments.remove(appointment);
                }
            }
            for(Appointment appointment:appointments)
                finalAppointments.add(appointment);
        }
        List<VisitModel> visitModelList=new ArrayList<>();
        for(Appointment appointment : finalAppointments){
            for(Visit visit : appointment.getFollowup().getVisitList()){
                VisitModel visitModel = new VisitModel();
                visitModel.setV_id(visit.getV_id());
                visitModel.setInstruction(appointment.getFollowup().getInstructions());
                visitModel.setName(appointment.getPatient().getName());
                visitModel.setAge(appointment.getPatient().getAge());
                visitModel.setAddress(appointment.getPatient().getAddress());
                visitModel.setCity(appointment.getPatient().getCity());
                visitModel.setGender(appointment.getPatient().getGender());
                visitModel.setState(appointment.getPatient().getState());
                visitModel.setPincode(appointment.getPatient().getPincode());
                visitModel.setMobilenumber(appointment.getPatient().getMobilenumber());
                visitModel.setTown(appointment.getPatient().getTown());
                visitModel.setIsvisited(visit.isVisited());
                visitModel.setDate(visit.getDate());
                visitModel.setOtp(visit.getOtp());
                visitModel.setF_id(appointment.getFollowup().getF_id());
                visitModelList.add(visitModel);
            }
        }
        return visitModelList;
    }

    @Override
    public Appointment getVisitDetails(Integer id) {
        Appointment appointment=this.appointmentRepo.findById(id).orElseThrow();
        return appointment;
    }
    @Override
    public  Visit saveVisit(ReceiveVistDataModel receiveVistDataModel) {

        Visit visit = this.visitRepo.findById(receiveVistDataModel.getV_id()).orElseThrow();
        if(visit.isVisited()==true)
            return null;
        visit.setV_id(receiveVistDataModel.getV_id());
        MedicalData medicalData = new MedicalData();
        medicalData.setBp(receiveVistDataModel.getBp());
        medicalData.setSugar_level(receiveVistDataModel.getSugar_level());
        medicalData.setTemperature(receiveVistDataModel.getTemperature());
        medicalData.setPhoto(receiveVistDataModel.getPhoto());
        medicalData.setVideo(receiveVistDataModel.getVideo());
        visit.setVisited(receiveVistDataModel.getIsVisited());
        Employee employee = this.employeeRepo.findById(receiveVistDataModel.getF_id()).orElseThrow();
        visit.setFieldWorker(employee);
        this.medicalRepo.save(medicalData);
        visit.setMedicalData(medicalData);
        visit.setDate(receiveVistDataModel.getDate());
        this.visitRepo.save(visit);
        return visit;
    }
}

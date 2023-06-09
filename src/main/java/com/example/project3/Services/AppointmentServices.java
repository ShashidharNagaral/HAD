package com.example.project3.Services;

import com.example.project3.Models.Appointment;

import java.text.ParseException;
import java.util.List;

public interface AppointmentServices {

    Appointment createAppointment(Appointment appointment,Integer p_id,Integer d_id) throws ParseException;
    Appointment updateAppointment(Appointment employeeDto, Integer id);
    Appointment getAppointmentById(Integer id);
    List<Appointment> getAllAppointments();
    void deleteAppointment(Integer id);

//    List<Appointment> searchAppByPIDorName(String id);
}

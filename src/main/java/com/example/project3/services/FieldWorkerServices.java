package com.example.project3.services;

import com.example.project3.entities.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

public interface FieldWorkerServices {
    List<VisitModel> getAppointmentListFW(Integer fid);
    Appointment getVisitDetails(Integer id);

    Visit saveVisit(ReceiveVistDataModel md) throws IOException;
}

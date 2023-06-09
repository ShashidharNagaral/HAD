package com.example.project3.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name ="appointment")
@NoArgsConstructor
@Getter
@Setter
//@SQLDelete(sql = "UPDATE appointment SET deleted = true WHERE e_id=?")
//@Where(clause = "deleted=false")
public class Appointment {
//    DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int a_id;
    private Date curr_date;
    private boolean isTreated;
    private boolean followupRemaining;
    private boolean deleted=Boolean.FALSE;
    @OneToOne
    private Patient patient;
    @OneToOne
    private Employee doctor;
    @OneToOne
    private Diagnostics diagnostics;
    @OneToOne(fetch = FetchType.EAGER)
    private Followup followup;

    public boolean getFollowupRemaining() {
        return this.followupRemaining;
    }
}


import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AppointmentService } from '../service/appointment.service';
import { DocService } from '../service/doc.service';
import { Appointment } from '../profile/appointment.model';
import { Doc } from '../profile/doc.model';

@Component({
    selector: 'es-ManageAppointment',
    templateUrl: 'manageAppointment.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 13px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class manageAppointmentComponent implements OnInit {
    patientemail: string;
    appointment: Appointment;
    appointments: Appointment[] = [];
    appointmentAvailable: number;
    doclicense: string;

    constructor(private appService: AppointmentService, 
                private router: Router,
                private docService: DocService) { }

    ngOnInit() {
        this.patientemail = localStorage.getItem('email');
        this.appointment = new Appointment(this.patientemail);

        this.appService.fetchAppointments(this.appointment)
            .subscribe(
                (appointments: Appointment []) => {
                    this.appointments = appointments;
                    this.appointmentAvailable = appointments.length;
                },
                error => console.log(error)
            )
    }
    
    cancelAppointment() {
        
    }
}
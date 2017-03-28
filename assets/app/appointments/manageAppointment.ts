
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { DocService } from '../service/doc.service';
import { Doc } from '../profile/doc.model';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../profile/appointment.model';
import { Availability } from '../profile/availability.model';
import { Flexible } from '../profile/flexible.model';

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
            font-size: 13px;
            width: 19%;
        }
    `]
})

export class manageAppointmentComponent implements OnInit {
    patientemail: string;
    appointment: Appointment;
    appointments: Appointment[] = [];
    flex: Flexible;
    dbflexApp: Flexible[] = [];
    appointmentAvailable: number;
    doclicense: string;
    time: string;
    datetime: number;

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

                    var i = 0;
                    for (let appoint of this.appointments) {
                        //Time Format
                        var tt = appoint.time;
                        if (tt.length > 3) {
                            this.time = tt.substr(0, 2);
                            this.time = this.time + ":" + "00";
                        }else{
                            this.time = tt.substr(0,1);
                            this.time = "0" + this.time + ":" + "00";
                        }
                        this.appointments[i].time = this.time;

                        //Date Format
                        this.appointments[i].date = this.formatDate(appoint.date);

                        i += 1;
                        this.time = "";
                    }
                },
                error => console.log(error)
            )
    }

    formatDate(date: any) {
        var Myear: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var date_array = date.split('/')
        var day;
        if (date_array[1] < 10){
            day = '0' + date_array[1];
        }else{
            day = date_array[1];
        }
        return Myear[date_array[0]-1] + " " + day + ", " + date_array[2];
    }    

    deFormatDate(date: string) {
        var Myear: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var date_array = date.split(',');
        var year = date_array[1].trim();
        var dd_array = date_array[0].split(" ");
        var month = Myear.indexOf(dd_array[0], 1) + 1;
        var day = dd_array[1];
        var date = month + "/" + day + "/" + year;
        return date;
    }
    
    cancelAppointment(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        
        var value_array = value.split("-");
        var doclicense = value_array[0];
        var date = value_array[1];
        var time = value_array[2];
        time = time.replace(":", "");
        date = this.deFormatDate(date);

        this.appointment.doclicense = doclicense;
        this.appointment.date = date;
        this.appointment.time = time;

        this.appService.deleteAppointment(this.appointment)
            .subscribe(
                data => { 
                    for (let app of this.appointments) {
                        var time = app.time.replace(":", "");
                        var date = this.deFormatDate(app.date);
                        if (data.obj.date == date && data.obj.time == time && data.obj.doclicense == app.doclicense) {
                            this.appointments.splice(this.appointments.indexOf(app), 1);
                            if (data.stat == 201) {
                                const availability = new Availability (
                                            app.doclicense,
                                            date,
                                            time
                                        );
                                this.docService.registerDocAvailability(availability)
                                    .subscribe(
                                        data => { data },
                                        error => console.log (error)
                                    );
                                this.cancelFlexibleAppointment(app);
                            }
                        }
                    }
                 },
                error => console.log(error)
            );
    }

    cancelFlexibleAppointment (app: Appointment) {
        if (app.patientflexibility == "True") {
            var date = this.deFormatDate(app.date);
            var time = app.time.replace(":", "");
            const flexible = new Flexible (
                    app.patientemail,
                    "",
                    "",
                    date,
                    time,
                    0,
                    app.doclicense,
                    app.doclastname
            )
            this.appService.deleteFlexibleAppointment(flexible)
                    .subscribe(
                        data => { 
                            this.flex = data.obj 
                            this.datetime = this.flex.datetime;
                        },
                        error => console.log (error)
                    );
        }
        this.emailFlexibleAvailability(app);
    }

    //Email patient with flexible appointmennts
    emailFlexibleAvailability(app: Appointment) {
        this.appService.getAllFlexibleAppointments()
            .subscribe(
                (flexibleAppoints: Flexible []) => {
                        this.dbflexApp = flexibleAppoints;
                        if (this.dbflexApp) {                   
                        //determine the earliest of the bunch to email, provided it is the same doctor
                        for (let flexApp of this.dbflexApp) {
                            if ((flexApp.datetime > this.datetime) && 
                                (flexApp.doclicense == this.flex.doclicense)){
                                    flexApp.date = app.date;
                                    flexApp.time = app.time;
                                    this.sendFlexEmail(flexApp);
                                    return;
                                }
                            }
                        }
                },
                error => console.log (error)
        );
    }

    sendFlexEmail(flexApp: Flexible) {
        this.appService.sendFlexEmail(flexApp)
            .subscribe(
                data => {data},
                error => {console.log (error) }
            );
    }
}
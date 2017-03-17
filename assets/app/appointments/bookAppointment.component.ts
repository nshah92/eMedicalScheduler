import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Doc } from '../profile/doc.model';
import { User } from '../profile/user.model';
import { Appointment } from '../profile/appointment.model';
import { dbService } from '../service/db.service';
import { DocService } from '../service/doc.service';
import { AppointmentService } from '../service/appointment.service';
import { Availability } from '../profile/availability.model';


@Component({
    selector: 'es-appointment',
    templateUrl: 'bookAppointment.component.html',
    styles: [`
        .change {
            color: #939496;
        }
        .dd {
            color: black;
        }
    `]
})

export class bookAppointmentComponent implements OnInit {
    @Input() doc: Doc;
    appointment: Appointment;

    availability: Availability[];
    date1: any;
    date2: any;
    user: User;
    entries = [];
    dates: string[] = [];
    avail1 = [];
    format1: any;
    format2: any;
    datetime: string;
    checkboxVal: boolean;
    statusCode: number;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private dbService: dbService,
        private docService: DocService,
        private appService: AppointmentService) {

        this._route.queryParams.subscribe(params => {
            this.doc = new Doc(params["firstname"],
                params["lastname"],
                params["email"],
                "",
                params["speciality"],
                params["license"],
                params["clinicname"],
                params["address"],
                params["city"],
                params["postalcode"],
                params["province"],
                params["website"]
            );
        });
    }

    bookAppointment(form: NgForm) {

        var flexible = "False";
        this.checkboxVal = form.value.flexible;
        if (this.checkboxVal){
            flexible = "True";
        }

        var dt: string [] = this.datetime.split('-');
        var date = dt[0];
        var time = dt[1];

        this.appointment = new Appointment (
                            this.user.email,
                            this.user.firstname,
                            this.user.lastname,
                            this.user.insuranceprovider,
                            flexible,
                            form.value.specialneed,
                            form.value.reason,
                            this.doc.doclicense,
                            date,
                            time);

               /*this.appService.makeAppointment(this.appointment)
                        .subscribe(
                            data => {
                                this.statusCode = data.stat;
                                console.log(data)
                                if (this.statusCode == 201) {
                                    this.removeTimeSlot();
                                }
                            },
                            error => {
                                this.statusCode = error.stat;
                                console.log(error)
                            }
                        )*/
             console.log("bookAppointment: Before calling removeTimeSlot()");
             this.removeTimeSlot();
    }

    removeTimeSlot() {
        console.log("removeTimeSlot: Before calling deleteDocAvailability()");
        this.docService.deleteDocAvailability (this.appointment)
            .subscribe(
                data => console.log(data),
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

    getAvailabiityDate() {
        this.date1 = this.availability[0].docdate;
        for (let i = 0; i < this.availability.length; i++) {
            if (this.date1 != this.availability[i].docdate) {
                this.date2 = this.availability[i].docdate;
                this.avail1.push(this.availability[i]);
            }
        }
        this.format1 = this.formatDate(this.date1);
        this.format2 = this.formatDate(this.date2);
    }

    onDateClick(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        var property = <HTMLInputElement>document.getElementById(value);
        property.style.backgroundColor = "black";
        
        this.datetime = value;
    }

    ngOnInit() {
        this.checkboxVal = false;
        this.user = new User(localStorage.getItem('email'));
        this.dbService.getUser(this.user)
            .subscribe(data => {
                this.user.insuranceprovider = data.obj.insuranceprovider;
                this.user.firstname = data.obj.firstname;
                this.user.lastname = data.obj.lastname;
                this.user.email = data.obj.email;
            },
            error => console.error(error));

        this.docService.getTime(this.doc)
            .subscribe(
                data => {
                    this.availability = data;
                    this.getAvailabiityDate();
                },
                error => console.log(error)
            );
    }
}

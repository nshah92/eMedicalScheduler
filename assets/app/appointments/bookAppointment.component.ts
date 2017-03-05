import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Doc } from '../profile/doc.model';
import { User } from '../profile/user.model';
import { dbService } from '../service/db.service';
import { DocService } from '../service/doc.service';
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

    availability: Availability[];
    date1: any;
    date2: any;
    user: User;
    entries = [];
    dates: string[] = [];
    avail1 = [];
    format1: any;
    format2: any;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private dbService: dbService,
        private docService: DocService) {
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

    test() {
        var elem = (<HTMLInputElement>document.getElementById("myBtn")).value;
        console.log(elem);
    }

    ngOnInit() {
        this.user = new User(localStorage.getItem('email'));
        this.dbService.getUser(this.user)
            .subscribe(data => {
                this.user.insuranceprovider = data.obj.insuranceprovider;
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

import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Doc } from '../profile/doc.model';
import { User } from '../profile/user.model';
import { dbService } from '../service/db.service';
import { DocService } from '../service/doc.service';


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

export class bookAppointmentComponent implements OnInit
{
    @Input() doc: Doc;
    user: User;
    entries = [];

    
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
                                params["website"]);
       });
    }

    ngOnInit() {
        this.user = new User(localStorage.getItem('email'));
        this.dbService.getUser(this.user)
            .subscribe(
                data => {
                    this.user.insuranceprovider = data.obj.insuranceprovider;
                    console.log (data.obj);
                },
                error => console.error (error)
            );

        this.docService.gettime(this.doc)
            .subscribe(
                data => console.log("Doc time:",data),
                error => console.log (error)
            );

        this.entries = [
            {
                description: '10:00',
                value: 1
            },
            {
                description: '11:00',
                value: 2
            },
            {
                description: '12:00',
                value: 3
            },
            {
                description: '1:00',
                value: 4
            }
        ];
    }
}

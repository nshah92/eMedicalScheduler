import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Doc } from '../profile/doc.model';
import { User } from '../profile/user.model';
import { dbService } from '../service/db.service';


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
    
    constructor(private _route: ActivatedRoute, 
                private _router: Router,
                private dbService: dbService) {
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
                                params["uni"]
                            );
       });
    }

    ngOnInit() {
        this.user = new User(localStorage.getItem('email'));
        this.dbService.getUser(this.user)
            .subscribe(
                data => {
                    this.user.insuranceprovider = data.obj.insuranceprovider;
                },
                error => console.error (error)
            )
    }
}

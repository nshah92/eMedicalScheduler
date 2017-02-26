import { Component, Input} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Doc } from '../profile/doc.model';


@Component({
    selector: 'es-appointment',
    templateUrl: 'bookAppointment.component.html'
})

export class bookAppointmentComponent
{
    @Input() doc: Doc;
    
    constructor(private _route: ActivatedRoute, private _router: Router)
    {
        this._route.queryParams.subscribe(params => {
           
           this.doc = new Doc(params["firstname"], 
                                params["lastname"],
                                params["email"],
                                "",
                                params["speciality"],
                                "",
                                params["clinicname"],
                                params["address"],
                                params["city"],
                                params["postalcode"],
                                params["province"],
                                params["website"]);
       });
    }
}

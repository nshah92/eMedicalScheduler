import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { dbService } from './service/db.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [dbService]
})
export class AppComponent {
    pageTitle: string = "eSchedular";

    constructor(private _route: ActivatedRoute, private _router: Router){}

    regPatient() : void {
        this._router.navigate(['/patient-registeration']);
    }
}
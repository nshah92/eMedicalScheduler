import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { dbService } from './service/db.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    pageTitle: string = "e-Medical Scheduler";

    constructor(private service: dbService, private _router: Router){}

    isLoggedIn() {
        return this.service.isLoggedIn();
    }

    regPatient() : void {
        this._router.navigate(['/patient-registration']);
    }
}
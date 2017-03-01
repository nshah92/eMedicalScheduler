import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { dbService } from './service/db.service';
import { User } from './profile/user.model';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
    pageTitle: string = "e-Medical Scheduler";
    myForm: FormGroup;
    cc: number;

    constructor(private dbService: dbService, private _router: Router){}

    isLoggedIn() {
        return this.dbService.isLoggedIn();
    }

    logout() {
        this.dbService.logout();
        this._router.navigate(['/']);
    }

    regPatient() : void {
        this._router.navigate(['/patient-registration']);
    }  

    ngOnInit() {}
}
import { Component } from '@angular/core';
import { Injectable } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { LandingPage } from '../profile/landingpage.model';

@Component({
    selector: 'es-landing',
    templateUrl: 'landingPage.component.html'
})

export class LandingPageComponent {

    

    constructor(private _route: ActivatedRoute, private _router: Router){}

    onFind(form: NgForm): void{
        
        const lp = new LandingPage(form.value.lpspeciality, form.value.lplocation);
        let navigationExtras: NavigationExtras = {
            queryParams:{
                "speciality": lp.lpspeciality,
                "location": lp.lplocation
            }
        };

        this._router.navigate(['/physicianlocator'], navigationExtras);
    }

}
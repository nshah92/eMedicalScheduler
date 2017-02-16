
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'es-physicianreg',
    templateUrl: 'physicianReg.component.html'
})
export class PhysicianRegComponent {

    constructor(private _route: ActivatedRoute, private _router: Router){}

    /*
    regPatient() : void {
        this._router.navigate(['/patient-registeration']);
    }*/
}
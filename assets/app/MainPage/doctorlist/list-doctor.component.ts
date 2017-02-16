import { Component } from '@angular/core';
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, } from '@angular/router';

@Component({
    selector: 'es-listdoctor',
    templateUrl: 'list-doctor.component.html'
})

export class ListDoctorComponent {

    constructor(private _route: ActivatedRoute, private _router: Router){}

    onFind(): void{
        this._router.navigate(['/physicianlocator']);
    }

}
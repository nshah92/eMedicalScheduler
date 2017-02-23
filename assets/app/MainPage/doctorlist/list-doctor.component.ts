import { Component, Input } from '@angular/core';
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, } from '@angular/router';
import { Doc } from '../../profile/doc.model';

@Component({
    selector: 'es-listdoctor',
    templateUrl: 'list-doctor.component.html'
})

export class ListDoctorComponent {
    @Input() doc: Doc;
    
    constructor(private _route: ActivatedRoute, private _router: Router){
       //console.log("ListDoctorComponent",this.doc.docaddress);
    }

    onFind(): void{
        this._router.navigate(['/physicianlocator']);
    }

}
import { Component, Input } from '@angular/core';
import { Injectable } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Doc } from '../../profile/doc.model';
import { dbService } from '../../service/db.service'

@Component({
    selector: 'es-listdoctor',
    templateUrl: 'list-doctor.component.html'
})

export class ListDoctorComponent {
    @Input() doc: Doc;
    
    constructor(private _route: ActivatedRoute, private _router: Router, private dbService: dbService){
       //console.log("ListDoctorComponent",this.doc.docaddress);
    }

    /*onFind(): void{
        this._router.navigate(['/physicianlocator']);
    }*/

    onBook(form: NgForm): void{
        console.log("Navigate to Booking Page");
    }

}
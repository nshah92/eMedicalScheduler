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
    
    constructor(private _route: ActivatedRoute, private _router: Router, private dbService: dbService){}

    onBook(form: NgForm): void{

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "firstname": this.doc.docfirstname,
                "lastname": this.doc.doclastname,
                "speciality": this.doc.docspeciality,
                "clinicname": this.doc.docclinicname,
                "address": this.doc.docaddress,
                "city": this.doc.doccity,
                "province": this.doc.docprovince,
                "postalcode": this.doc.docpostalcode,
                "email": this.doc.docemail,
                "website": this.doc.docuni,
                "license": this.doc.doclicense
            }
        };

        this._router.navigate(['/booking'],navigationExtras);
    }

}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doc } from '../profile/doc.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DocService } from '../service/doc.service';

@Component({
    selector: 'es-physicianreg',
    templateUrl: 'physicianReg.component.html'
})
export class PhysicianRegComponent {

    constructor(private docService: DocService){}

    registerDoctor(form: NgForm) {
        const doc = new Doc(form.value.docfirstname, 
                                form.value.doclastname, 
                                form.value.docemail,
                                form.value.docpassword, 
                                form.value.docspeciality, 
                                form.value.doclicense, 
                                form.value.docclinicname, 
                                form.value.docaddress,
                                form.value.doccity,
                                form.value.docpostalcode,
                                form.value.docprovince,
                                form.value.docwebsite,
                                );

        this.docService.registerDoc(doc)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            );
        form.resetForm();
    }
}
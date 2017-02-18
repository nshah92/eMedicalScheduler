import { Component, OnInit } from '@angular/core';
import { User } from '../profile/user.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { dbService } from '../service/db.service';

@Component({
    selector: 'es-patientreg',
    templateUrl: 'patientReg.component.html'
})

export class PatientRegComponent implements OnInit {

    //myForm: FormGroup;

    constructor(private dbService: dbService) { }

    registerPatient(form: NgForm) {
        const user = new User(form.value.email, 
                                form.value.password, 
                                form.value.firstname,
                                form.value.lastname, 
                                form.value.dob, 
                                form.value.selectgender, 
                                form.value.selectinsurance, 
                                form.value.allergies);

        this.dbService.registerUser(user)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            );
        form.resetForm();
    }
    

    ngOnInit() {
       /* 
            Perform Init Functions
       */
    }

}
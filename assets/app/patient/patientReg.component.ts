import { Component, OnInit } from '@angular/core';
import { User } from '../profile/user.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { dbService } from '../service/db.service';
import { Router } from "@angular/router";

@Component({
    selector: 'es-patientreg',
    templateUrl: 'patientReg.component.html'
})

export class PatientRegComponent implements OnInit {

    constructor(private dbService: dbService, private router: Router) { }

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
            this.router.navigateByUrl('/');
        form.resetForm();


    }
    

    ngOnInit() {
       /* 
            Perform Init Functions
       */
    }

}
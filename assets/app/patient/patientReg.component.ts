import { Component, OnInit } from '@angular/core';
import { User } from '../profile/user.model';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { dbService } from '../service/db.service';

@Component({
    selector: 'es-patientreg',
    templateUrl: 'patientReg.component.html'
})

export class PatientRegComponent implements OnInit {
    user: User;
    statusCode: number;

    constructor(private dbService: dbService, private router: Router) { }

    registerPatient(form: NgForm) {

        if (!this.dbService.isLoggedIn()) {
            this.user = new User(form.value.email, 
                                form.value.password, 
                                form.value.firstname,
                                form.value.lastname, 
                                form.value.dob, 
                                form.value.selectgender, 
                                form.value.selectinsurance, 
                                form.value.allergies);

            this.dbService.registerUser(this.user)
                .subscribe(
                    data => {
                        console.log(data);
                        this.statusCode = data.stat;
                        console.log("Status Code: " + this.statusCode);
                        /*if (this.statusCode == 201) {
                            this.sendRegistrationConfirmation();
                        }*/
                        this.sendRegistrationConfirmation();
                    },
                    error => console.error(error)
            );
            form.resetForm();
        }else{
            //Update
            this.user.firstname = form.value.firstname;
            this.user.lastname = form.value.lastname;
            this.user.dob = form.value.dob;
            this.user.gender = form.value.selectgender;
            this.user.insuranceprovider = form.value.selectinsurance;
            this.user.allergies = form.value.allergies;
            this.dbService.updateUser(this.user)
                .subscribe(
                    data => console.log (data),
                    error => console.error(error)
                )
        }
        this.router.navigateByUrl('/home');
    }

     sendRegistrationConfirmation(){
         this.dbService.sendEmail(this.user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            )
     }
    
    ngOnInit() {

        if (this.dbService.isLoggedIn()) {
            this.user = new User(localStorage.getItem('email'));
            this.dbService.getUser(this.user)
                .subscribe(
                    data => {
                        this.user = new User(
                            data.obj.email,
                            "",
                            data.obj.firstname,
                            data.obj.lastname,
                            data.obj.dob,
                            data.obj.gender,
                            data.obj.insuranceprovider,
                            data.obj.allergies
                        );
                    },
                    error => console.error (error)
                )
        }
    }
}
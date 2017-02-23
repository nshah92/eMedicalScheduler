import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { dbService } from '../service/db.service';
import { User } from '../profile/user.model';

@Component({
    selector: 'es-modal',
    templateUrl: 'modal.component.html',
    styles: [`
        .errorr {
            color: red;
        }
    `]
})

export class ModalComponent {
    
    myForm: FormGroup;
    statusCode: number = 200;

    constructor(private dbService: dbService, private router: Router) {}

    onSignin() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.dbService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('firstname', data.firstname);
                    localStorage.setItem('lastname', data.lastname);
                    localStorage.setItem('dob', data.dob);            
                    localStorage.setItem('gender', data.gender);
                    localStorage.setItem('insurance', data.insurance);
                    localStorage.setItem('allergies', data.allergies);                              
                    this.statusCode = data.stat;
                    this.router.navigateByUrl('/');
                },
                error => {
                    this.statusCode = error.stat;
                    console.log(error)
                }
            );

        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

}
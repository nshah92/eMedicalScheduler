import { Component } from '@angular/core';
import { User } from '../profile/user.model';
import { NgForm } from '@angular/forms';
import { dbService } from '../service/db.service';

@Component({
    selector: 'es-patientreg',
    templateUrl: 'patientReg.component.html'
})

export class PatientRegComponent {

    constructor(private dbService: dbService) { }

    registerPatient(form: NgForm) {
        const user = new User(form.value.email, form.value.password, form.value.firstname,
            form.value.lastname, "Male", form.value.dob, "XYZ", "XYZ")

        this.dbService.registerUser(user)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            );
        form.resetForm();
    }

}
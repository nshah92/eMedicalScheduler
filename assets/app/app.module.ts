import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { ModalComponent } from "./HomePage/modal.component";
import { LandingPageComponent } from "./HomePage/landingPage.component";
import { PatientRegComponent } from "./patient/patientReg.component";
import { PhysicianRegComponent } from "./doctor/physicianReg.component";
import { MainPageComponent } from "./MainPage/main-page.component";
import { ListDoctorComponent } from "./MainPage/doctorlist/list-doctor.component";
import { EqualValidator } from "./validators/equal-validator.directive";
import { routing } from "./app.routing";
import { dbService } from "./service/db.service"
import { DocService } from "./service/doc.service"

@NgModule({
    declarations: [
        AppComponent,
        ModalComponent,
        LandingPageComponent,
        PatientRegComponent,
        PhysicianRegComponent,
        MainPageComponent,
        ListDoctorComponent,
        EqualValidator
    ],
    imports: [  BrowserModule, 
                routing,  
                FormsModule,
                ReactiveFormsModule,
                HttpModule ],
    providers: [    dbService,
                    DocService ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
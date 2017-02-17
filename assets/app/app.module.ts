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
import { routing } from "./app.routing";

@NgModule({
    declarations: [
        AppComponent,
        ModalComponent,
        LandingPageComponent,
        PatientRegComponent,
        PhysicianRegComponent,
        MainPageComponent,
        ListDoctorComponent
    ],
    imports: [  BrowserModule, 
                routing,  
                FormsModule,
                ReactiveFormsModule,
                HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
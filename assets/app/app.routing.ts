import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent} from './HomePage/landingPage.component';
import { PatientRegComponent } from './patient/patientReg.component';
import { PhysicianRegComponent } from './doctor/physicianReg.component';
import { MainPageComponent } from "./MainPage/main-page.component";
import { bookAppointmentComponent } from "./appointments/bookAppointment.component";

const APP_ROUTES: Routes = [
    { path: 'home', component: LandingPageComponent },
    { path: 'physicianlocator', component: MainPageComponent },
    { path: 'patient-registration', component: PatientRegComponent },
    { path: 'physician-registration', component: PhysicianRegComponent },
    { path: 'booking', component: bookAppointmentComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
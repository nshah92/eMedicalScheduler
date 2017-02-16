import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent} from './HomePage/landingPage.component';
import { PatientRegComponent } from './patient/patientReg.component';
import { PhysicianRegComponent } from './doctor/physicianReg.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: LandingPageComponent },
    { path: 'patient-registeration', component: PatientRegComponent },
    { path: 'physician-registration', component: PhysicianRegComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
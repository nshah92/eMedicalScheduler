import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { dbService } from './service/db.service';
import { User } from './profile/user.model';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    pageTitle: string = "e-Medical Scheduler";
    @Input() user: User;

    constructor(private dbService: dbService, private _router: Router){}

    isLoggedIn() {
        return this.dbService.isLoggedIn();
    }

    logout() {
        this.dbService.clickNo = 0;
        this.dbService.logout();
        console.log('click count is ' + this.dbService.clickNo);
        this._router.navigate(['/']);
    }

    regPatient() : void {
        this._router.navigate(['/patient-registration']);
    }  
}
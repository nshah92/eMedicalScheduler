
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doc } from '../profile/doc.model';
import { Availability } from '../profile/availability.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DocService } from '../service/doc.service';

@Component({
    selector: 'es-physicianreg',
    templateUrl: 'physicianReg.component.html'
})
export class PhysicianRegComponent {

    availability:Availability;
    error: boolean = false;
    success: boolean = false;
    constructor(private docService: DocService){}

    registerDoctor(form: NgForm) {
        const doc = new Doc(form.value.docfirstname, 
                                form.value.doclastname, 
                                form.value.docemail,
                                form.value.docpassword, 
                                form.value.docspeciality, 
                                form.value.doclicense, 
                                form.value.docclinicname, 
                                form.value.docaddress,
                                form.value.doccity,
                                form.value.docpostalcode,
                                form.value.docprovince,
                                form.value.docuni,
                                );

        this.docService.registerDoc(doc)
            .subscribe(
                data => {data},
                error => {
                    console.error(error);
                }
            );

        for(let i = 0; i < 2; i++){
            
            var randomDate;
            var date = new Array();
            randomDate = Math.floor(Math.random() * 8) + 9;
            date.push(randomDate);
            
            for(let j = 1; j < 5; j++){
                 
                randomDate = Math.floor(Math.random() * 8) + 9;
                 
                 while(date.indexOf(randomDate) > -1){
                     randomDate = Math.floor(Math.random() * 8) + 9;
                 }
                 
                 date.push(randomDate);
                 date.sort(function(a,b){
                      return a - b;
                    });
             }

             for(let j = 0; j < 5; j++){
                 if (date[j] === 9){
                     date[j] = 900;
                 }else {
                     date[j] = parseInt(date[j] + '00');
                 }
             }             
             
            var currentDate = new Date().toLocaleDateString();
            var day = new Date();
            var dd = this.addDays (day, 1);
            var followingday = dd.getUTCMonth()+1 + "/" + dd.getDate() + "/" + dd.getFullYear();

             for(let j = 0; j < 5; j++){
                 if(i == 0){
                    this.availability = new Availability(form.value.doclicense, currentDate, date[j].toString());
                    if (this.availability.doctime.length <= 3){
                         this.availability.doctime = "0" + this.availability.doctime;
                     }
                     this.docService.registerDocAvailability(this.availability)
                        .subscribe(
                            data => {data},
                            error => console.error(error)
                        );
                 } else{
                    this.availability = new Availability(form.value.doclicense, followingday, date[j].toString());
                    if (this.availability.doctime.length <= 3){
                         this.availability.doctime = "0" + this.availability.doctime;
                     }
                     this.docService.registerDocAvailability(this.availability)
                        .subscribe(
                            data => {this.success=true;},
                            error => { 
                                console.error(error);
                                this.error=true;
                            }
                        );
                 }
             }
        }
        form.resetForm();
    }

    addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }    
}
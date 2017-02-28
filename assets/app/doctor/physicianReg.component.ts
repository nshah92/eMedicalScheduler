
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doc } from '../profile/doc.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DocService } from '../service/doc.service';

@Component({
    selector: 'es-physicianreg',
    templateUrl: 'physicianReg.component.html'
})
export class PhysicianRegComponent {

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

        /*this.docService.registerDoc(doc)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            );*/

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
                 if(date[j] === 9){
                     date[j] = 900;
                 }
                 if(date[j] === 10){
                     date[j] = 1000;
                 }
                 if(date[j] === 11){
                     date[j] = 1100;
                 }
                 if(date[j] === 12){
                     date[j] = 1200;
                 }
                 if(date[j] === 13){
                     date[j] = 1300;
                 }
                 if(date[j] === 14){
                     date[j] = 1400;
                 }
                 if(date[j] === 15){
                     date[j] = 1500;
                 }
                 if(date[j] === 16){
                     date[j] = 1600;
                 }
             }             
             
             console.log(date);  
             console.log("-------------");
             /*this.docService.registerDocAvailability(form.value.doclicense, date)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );*/
        }
        
        form.resetForm();
    }
}
import { Component, Input } from '@angular/core';
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, } from '@angular/router';

import { DocService } from '../service/doc.service';
import { Doc } from '../profile/doc.model';
import { LandingPage } from '../profile/landingpage.model';

declare var google: any;

@Component({
    selector:'es-main',
    //moduleId: module.id,
    templateUrl: 'main-page.component.html'
})

export class MainPageComponent
{
    
    pageTitle: string = 'eMedical Scheduler';
    docs: Doc[];
    lp: LandingPage;
    private sub: any;
    location: string;
    speciality: string;
    

    constructor(private _route: ActivatedRoute, private _router: Router, private docService: DocService){
               
        this._route.queryParams.subscribe(params => {
           this.location = params["location"];
           this.speciality = params["speciality"];

           this.lp = new LandingPage(this.speciality, this.location);
       });

       
    }

    onBook(): void{
        this._router.navigate(['/doctoravailability']);
    }
    
    ngOnInit() {
        
        this.docService.getDocLocation(this.lp)
            .subscribe(
            (docs: Doc[]) => {
                this.docs = docs;
                console.log(docs);
                for (let doc of this.docs) {
                    console.log("Subscribe", doc.docaddress);
                }
            }
            );
        
        console.log("After subscribe");
        
        var mapProp = {
            center: new google.maps.LatLng(48.421481, -89.261897),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var myLatLng = {lat: 48.421481, lng: -89.261897};
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        // var marker = new google.maps.Marker({
        //   position: myLatLng,
        //   map: map,
        //   title: 'Hello World!'
        // });

        var image = 'app/assets/images/marker.png'
        var beachMarker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: image
        });
    }
}
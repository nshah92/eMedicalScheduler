import { Component, Input } from '@angular/core';
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { DocService } from '../service/doc.service';
import { Doc } from '../profile/doc.model';
import { LandingPage } from '../profile/landingpage.model';
import { dbService } from '../service/db.service';

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
    locs:any[] = [];
    mplocation:string;
    docFlag: boolean = true;
   

    constructor(private _route: ActivatedRoute, private _router: Router, private docService: DocService, private dbService: dbService){
               
        this._route.queryParams.subscribe(params => {
           this.location = params["location"];
           this.speciality = params["speciality"];

           this.lp = new LandingPage(this.speciality, this.location);
       });
    }

    onFind(form: NgForm): void{
       
        this.locs = [];
        this.lp = new LandingPage(form.value.mpspeciality, this.mplocation);
        this.location = form.value.mplocation;
        this.docService.getDocLocation(this.lp)
                .subscribe(
                docs => {
                    this.docs = docs;
                    this.getLatLng();
                }
                ); 
    }

    onBook(): void{
        this._router.navigate(['/doctoravailability']);
    }

    getLatLng(){
        
        if(this.docs.length !== 0){
            this.docFlag = true;

            for (let doc of this.docs) {
                this.docService.getMarkerPosition(doc.docaddress, doc.docpostalcode, doc.doccity)
                .subscribe(
                    data => {
                        this.populateMarkers(JSON.stringify(data.results[0].geometry.location.lat), 
                        JSON.stringify(data.results[0].geometry.location.lng));
                    },
                    error => console.log(error)
                )
            }
        } else {
            this.docFlag = false;
            
            this.docService.getMarkerPosition("", "", this.location)
                .subscribe(
                    data => {
                        this.populateMarkers(JSON.stringify(data.results[0].geometry.location.lat), 
                        JSON.stringify(data.results[0].geometry.location.lng));
                    },
                    error => console.log(error)
                )
        }
    }

    populateMarkers(lat:String, lng:String){
        
        this.locs.push(+lat);
        this.locs.push(+lng);

        var mapProp = {
            center: new google.maps.LatLng(+lat, +lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        
        if(this.docFlag == true){
            var icon = {
                url: "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/medical-512.png", // url
                scaledSize: new google.maps.Size(35, 35), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };

            for(let i = 0; i < this.locs.length; i = i+2){
                
                new google.maps.Marker({
                    position: {lat: this.locs[i], lng: this.locs[i+1]},
                    map: map,
                    icon: icon
                });
            }
        }
    }
    populatelocation(field:string)
    {
        this.mplocation=field;
    }
    
    ngOnInit() {
        
        this.docService.getDocLocation(this.lp)
            .subscribe(
            docs => {
                this.docs = docs;
                this.getLatLng();
            }
            );
        // Initialize the search box and autocomplete
        let searchBox: any = document.getElementById('mplocation');
        let options = {
            types: [
                // return only geocoding results, rather than business results.
                'geocode',
            ]
        };
        var autocomplete = new google.maps.places.Autocomplete(searchBox, options);

        // Add listener to the place changed event
        autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            let address = place.formatted_address;
            var fields = address.split(',');
            this.populatelocation(fields[0]);
        });      
    }
}
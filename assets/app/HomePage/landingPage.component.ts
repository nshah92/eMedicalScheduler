import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { LandingPage } from '../profile/landingpage.model';

@Component({
    selector: 'es-landing',
    templateUrl: 'landingPage.component.html'
})

export class LandingPageComponent implements OnInit {
    lplocation:string;

    constructor(private _route: ActivatedRoute, private _router: Router){}
    

    onFind(form: NgForm): void{
        const lp = new LandingPage(form.value.lpspeciality, form.value.lplocation);
        let navigationExtras: NavigationExtras = {
            queryParams:{
                "speciality": lp.lpspeciality,
                "location": lp.lplocation
            }
        };

        this._router.navigate(['/physicianlocator'], navigationExtras);
    }

    ngOnInit() {

        // Initialize the search box and autocomplete
        let searchBox: any = document.getElementById('lplocation');
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
            this.lplocation=fields[0];
            // this.placeChanged(lat, lng, address);
        });
    }

}
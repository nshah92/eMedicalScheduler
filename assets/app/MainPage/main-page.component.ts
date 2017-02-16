import { Component } from '@angular/core';
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, } from '@angular/router';

declare var google: any;

@Component({
    selector:'es-main',
    //moduleId: module.id,
    templateUrl: 'main-page.component.html'
})

export class MainPageComponent
{
    pageTitle: string = 'eMedical Scheduler';

    constructor(private _route: ActivatedRoute, private _router: Router){}

    onBook(): void{
        this._router.navigate(['/doctoravailability']);
    }
    
    ngOnInit() {
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
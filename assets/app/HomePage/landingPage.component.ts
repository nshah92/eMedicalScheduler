import { Component } from '@angular/core';
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, } from '@angular/router';

@Component({
    selector: 'es-landing',
    templateUrl: 'landingPage.component.html'
})

export class LandingPageComponent {

    constructor(private _route: ActivatedRoute, private _router: Router){}

    onFind(): void{
        this._router.navigate(['/physicianlocator']);
    }

}
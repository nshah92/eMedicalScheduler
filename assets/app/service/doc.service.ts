import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Doc } from '../profile/doc.model';
import { Availability } from '../profile/availability.model';
import { Appointment } from '../profile/appointment.model';
import { LandingPage } from '../profile/landingpage.model';

@Injectable()
export class DocService {
    private doc: Doc[] = [];
    private availability: Availability[] = [];
    constructor(private http: Http) {}
    speciality: String;
    location: String;

    registerDoc(doc: Doc) {
        //console.log("doc.service - Doc:",doc);
        const body = JSON.stringify(doc);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/docreg', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const doc = new Doc(result.obj.docfirstname,
                                        result.obj.doclastname, 
                                        result.obj.docemail,
                                        result.obj.docpassword, 
                                        result.obj.docspeciality, 
                                        result.obj.doclicense, 
                                        result.obj.docclinicname, 
                                        result.obj.docaddress,
                                        result.obj.doccity,
                                        result.obj.docpostalcode,
                                        result.obj.docprovince,
                                        result.obj.docuni);
                this.doc.push(doc);
                return doc;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
    }

    registerDocAvailability(availability: Availability){
        const body = JSON.stringify(availability);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/docavailability', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const availability = new Availability(result.obj.doclicense,
                                                        result.obj.docdate, 
                                                        result.obj.doctime);
                this.availability.push(availability);
                return availability;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
    }

    deleteDocAvailability(appointment: Appointment) {
        console.log("deleteDocAvailability: ",  appointment.doclicense);
        console.log("deleteDocAvailability: ",  appointment.date);
        console.log("deleteDocAvailability: ",  appointment.time);
       
        let params = new URLSearchParams();
        params.set('doclicense',  appointment.doclicense);
        params.set('docdate',  appointment.date);
        params.set('doctime',  appointment.time);
       
        return this.http.delete('http://localhost:3000/docavailability', {search: params})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));        
    }

    getDocLocation(lp: LandingPage) {
        let params = new URLSearchParams();
        params.set('lpspeciality', lp.lpspeciality);
        params.set('lplocation', lp.lplocation);
        
        return this.http.get('http://localhost:3000/docreg', {search: params})
            .map((response: Response) => {
                const docs = response.json().obj;
                let transformedDocs: Doc[] = [];
                for (let doc of docs) {
                    transformedDocs.push(new Doc(
                        doc.docfirstname,
                        doc.doclastname,
                        doc.docemail,
                        doc.docpassword,
                        doc.docspeciality,
                        doc.doclicense,
                        doc.docclinicname,
                        doc.docaddress,
                        doc.doccity,
                        doc.docpostalcode,
                        doc.docprovince,
                        doc.docuni)
                    );
                }
                this.doc = transformedDocs;
                return transformedDocs;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

  getMarkerPosition(address: string, postalcode: string, city:string){
       const headers = new Headers({'Content-Type': 'application/html'});

       if(address.length == 0 && postalcode.length ==0){
           
           return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + city)
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
       } else{
            
            return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + city + postalcode)
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
       }
   }

   getTime(doc: Doc) {
       console.log("In Gettime method", doc.doclicense);
       let params = new URLSearchParams();
        params.set('doclicense', doc.doclicense);

        return this.http.get('http://localhost:3000/docavailability', {search: params})
            .map((response: Response) => {
                const avails = response.json().obj;
                let transformedAvailability: Availability[] = [];
                for (let avail of avails) {
                    transformedAvailability.push(new Availability(
                        avail.doclicense,
                        avail.docdate,
                        avail.doctime)
                    ); 
                }
                this.availability = transformedAvailability;
                return transformedAvailability;
            })
            .catch((error: Response) => Observable.throw(error));
    }
}
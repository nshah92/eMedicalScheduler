import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Doc } from '../profile/doc.model';
import { LandingPage } from '../profile/landingpage.model';

@Injectable()
export class DocService {
    private doc: Doc[] = [];
    constructor(private http: Http) {}
    speciality: String;
    location: String;

    registerDoc(doc: Doc) {
        console.log("Doc:",doc);
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
                                        result.obj.docwebsite);
                this.doc.push(doc);
                return doc;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
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
                        doc.docwebsite)
                    );
                }
                this.doc = transformedDocs;
                return transformedDocs;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMarkerPosition(address: string, postalcode: string, city:string){
       const headers = new Headers({'Content-Type': 'application/html'});
       
       return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + city + postalcode)
           .map((response: Response) => response.json())
           .catch((error: Response) => Observable.throw(error.json()));
   }
}
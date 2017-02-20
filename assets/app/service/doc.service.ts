import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Doc } from '../profile/doc.model'

@Injectable()
export class DocService {
    private doc: Doc[] = [];
    constructor(private http: Http) {}

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
}
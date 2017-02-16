import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from '../profile/user.model'

@Injectable()
export class dbService {
    private user: User[] = [];
    constructor(private http: Http) {}

    registerUser(user: User) {
        console.log("User:",user);
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/userreg', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const user = new User(result.obj.email,
                                        result.obj.password, 
                                        result.obj.firstname,
                                        result.obj.lastname, 
                                        "Male", 
                                        result.obj.dob, 
                                        "XYZ", 
                                        "XYZ");
                this.user.push(user);
                return user;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
    }
}

import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Appointment } from '../profile/appointment.model'

@Injectable()
export class AppointmentService {

    constructor(private http: Http) {}

    makeAppointment(appointment: Appointment) {
        const body = JSON.stringify(appointment);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/appointment', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const appointment = new Appointment (result.obj.patientemail,
                                        result.obj.patientfirstname, 
                                        result.obj.patientlastname,
                                        result.obj.patientinsurance, 
                                        result.obj.patientflexibility, 
                                        result.obj.patientspecialneed, 
                                        result.obj.patientreason, 
                                        result.obj.doclicense,
                                        result.obj.date,
                                        result.obj.time);
                return result;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
    }

}
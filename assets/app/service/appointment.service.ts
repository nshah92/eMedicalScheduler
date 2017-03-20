
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Appointment } from '../profile/appointment.model'

@Injectable()
export class AppointmentService {
    private appointments: Appointment[] = [];

    constructor(private http: Http) {}

    makeAppointment(appointment: Appointment) {
        const body = JSON.stringify(appointment);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/appointment', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const appointment = new Appointment (result.obj.patientemail,
                                        result.obj.docfirstname, 
                                        result.obj.doclastname,
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

    fetchAppointments(appointment: Appointment) {
        return this.http.get('http://localhost:3000/appointment/' + appointment.patientemail)
            .map((response: Response) => {
                const appointments = response.json().obj;
                let transformedAppointments: Appointment [] = [];
                for (let appointment of appointments) {
                    transformedAppointments.push(new Appointment(
                                                    appointment.patientemail,
                                                    appointment.docfirstname,
                                                    appointment.doclastname,
                                                    appointment.patientinsurance,
                                                    appointment.patientflexibility,
                                                    appointment.patientspecialneed,
                                                    appointment.patientreason,
                                                    appointment.doclicense,
                                                    appointment.date,
                                                    appointment.time)
                    )
                }
                this.appointments = transformedAppointments;
                return transformedAppointments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
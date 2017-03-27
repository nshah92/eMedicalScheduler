
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Appointment } from '../profile/appointment.model';
import { Flexible } from '../profile/flexible.model';

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
                                        result.obj.patientfirstname, 
                                        result.obj.patientlastname,
                                        result.obj.patientinsurance, 
                                        result.obj.patientflexibility, 
                                        result.obj.patientspecialneed,
                                        result.obj.patientreason,
                                        result.obj.doclicense,
                                        result.obj.docfirstname,
                                        result.obj.doclastname,
                                        result.obj.docclinicname,
                                        result.obj.docaddress,
                                        result.obj.doccity,
                                        result.obj.docpostalcode,
                                        result.obj.docprovince,
                                        result.obj.date,
                                        result.obj.time);
                return result;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
    }

    sendEmail(appointment: Appointment){
        const body = JSON.stringify(appointment);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/confirmation', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(console.log(error)));
    }

    sendFlexEmail(flexible: Flexible){
        const body = JSON.stringify(flexible);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/flexemail', body, {headers: headers})
            .map((response: Response) => response.json())
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
                                                    appointment.patientfirstname,
                                                    appointment.patientlastname,
                                                    appointment.patientinsurance,
                                                    appointment.patientflexibility,
                                                    appointment.patientspecialneed,
                                                    appointment.patientreason,
                                                    appointment.doclicense,
                                                    appointment.docfirstname,
                                                    appointment.doclastname,
                                                    appointment.docclinicname,
                                                    appointment.docaddress,
                                                    appointment.doccity,
                                                    appointment.docpostalcode,
                                                    appointment.docprovince,
                                                    appointment.date,
                                                    appointment.time)
                    )
                }
                this.appointments = transformedAppointments;
                return transformedAppointments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteAppointment(appointment: Appointment) {
        let params = new URLSearchParams();
        params.set('email', appointment.patientemail);
        params.set('doclicense',  appointment.doclicense);
        params.set('date',  appointment.date);
        params.set('time',  appointment.time);
       return this.http.delete('http://localhost:3000/appointment', {search: params})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(console.log(error)));        
    }    

    deleteFlexibleAppointment(flexible: Flexible) {
        let params = new URLSearchParams();
        params.set('email', flexible.email);
        params.set('date',  flexible.date);
        params.set('time',  flexible.time);    
        params.set('doclicense', flexible.doclicense);    
        return this.http.delete('http://localhost:3000/flexbile', {search: params})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(console.log(error)));        
    }      

    writeFlexibleAppointment(flexible: Flexible){
        const body = JSON.stringify(flexible);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/flexbile', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const flexbile = new Flexible (result.obj.email,
                                        result.obj.firstname, 
                                        result.obj.lastname,
                                        result.obj.date, 
                                        result.obj.time, 
                                        result.obj.datetime,
                                        result.obj.doclicense,
                                        result.obj.doclastname);
                return result;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
    }

    getAllFlexibleAppointments() {
        return this.http.get('http://localhost:3000/flexbile')
            .map((response: Response) => {
                const flexibles = response.json().obj;
                let flexibleAppointments: Flexible [] = [];
                for (let flexapp of flexibles) {
                    flexibleAppointments.push(new Flexible(
                                                    flexapp.email,
                                                    flexapp.firstname,
                                                    flexapp.lastname,
                                                    flexapp.date,
                                                    flexapp.time,
                                                    flexapp.datetime,
                                                    flexapp.doclicense,
                                                    flexapp.doclastname)
                    )
                }
                return flexibleAppointments;
            })
            .catch((error: Response) => Observable.throw(console.log(error)));
    }
}
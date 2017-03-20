export class Appointment {
    patientemail: string;
    docfirstname?: string;
    doclastname?: string;
    patientinsurance?: string;
    patientflexibility?: string;
    patientspecialneed?: string;
    patientreason?: string;
    doclicense?: string;
    date?: string;
    time?: string;
    
    constructor(patientemail: string,
                docfirstname?: string,
                doclastname?: string,
                patientinsurance?: string,
                patientflexibility?: string,
                patientspecialneed?: string,
                patientreason?: string,
                doclicense?: string,
                date?: string,
                time?: string) {
                                        this.patientemail = patientemail;
                                        this.docfirstname = docfirstname;
                                        this.doclastname = doclastname;      
                                        this.patientinsurance = patientinsurance;
                                        this.patientflexibility = patientflexibility;
                                        this.patientspecialneed = patientspecialneed;
                                        this.patientreason = patientreason;
                                        this.doclicense = doclicense;
                                        this.date = date;
                                        this.time = time;
    }
}
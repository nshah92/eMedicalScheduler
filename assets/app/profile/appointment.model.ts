export class Appointment {
    patientemail: string;
    patientfirstname?: string;
    patientlastname?: string;
    patientinsurance?: string;
    patientflexibility?: string;
    patientspecialneed?: string;
    patientreason?: string;
    doclicense?: string;
    docfirstname?: string;
    doclastname?: string;
    docclinicname?: string;
    docaddress?: string;
    doccity?: string;
    docpostalcode?: string;
    docprovince?: string;
    date?: string;
    time?: string;
    
    constructor(patientemail: string,
                patientfirstname?: string,
                patientlastname?: string,
                patientinsurance?: string,
                patientflexibility?: string,
                patientspecialneed?: string,
                patientreason?: string,
                doclicense?: string,
                docfirstname?: string,
                doclastname?: string,
                docclinicname?: string,
                docaddress?: string,
                doccity?: string,
                docpostalcode?: string,
                docprovince?: string,
                date?: string,
                time?: string) {
                                        this.patientemail = patientemail;
                                        this.patientfirstname = patientfirstname;
                                        this.patientlastname = patientlastname;      
                                        this.patientinsurance = patientinsurance;
                                        this.patientflexibility = patientflexibility;
                                        this.patientspecialneed = patientspecialneed;
                                        this.patientreason = patientreason;
                                        this.doclicense = doclicense;
                                        this.docfirstname = docfirstname;
                                        this.doclastname = doclastname;
                                        this.docclinicname = docclinicname;
                                        this.docaddress = docaddress;
                                        this.doccity = doccity;
                                        this.docpostalcode = docpostalcode;
                                        this.docprovince = docprovince;
                                        this.date = date;
                                        this.time = time;
    }
}
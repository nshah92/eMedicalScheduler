export class Doc {
    docfirstname: string;
    doclastname: string;
    docemail: string;
    docpassword: string;    
    docspeciality: string;
    doclicense: string;
    docclinicname: string;
    docaddress: string;
    doccity: string;
    docpostalcode: string;
    docprovince: string;
    docwebsite: string;
    
    constructor(docfirstname: string,
                doclastname: string,
                docemail: string,
                docpassword: string,    
                docspeciality: string,
                doclicense: string,
                docclinicname: string,
                docaddress: string,
                doccity: string,
                docpostalcode: string,
                docprovince: string,
                docwebsite: string) {
                                        this.docfirstname = docfirstname;
                                        this.doclastname = doclastname;
                                        this.docemail = docemail;
                                        this.docpassword = docpassword;
                                        this.docspeciality = docspeciality;
                                        this.doclicense = doclicense;
                                        this.docclinicname = docclinicname;
                                        this.docaddress = docaddress;
                                        this.doccity = doccity;
                                        this.docpostalcode = docpostalcode;
                                        this.docprovince = docprovince;
                                        this.docwebsite = docwebsite;
                                        
                                        
    }

}
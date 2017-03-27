export class Flexible {
    email: string;
    firstname?: string;
    lastname?: string;
    date?: string;
    time?: string;
    datetime?: number;
    doclicense?: string;
    doclastname?: string;
    
    constructor(email: string,
                firstname?: string,
                lastname?: string,
                date?: string,
                time?: string,
                datetime?: number,
                doclicense?: string,
                doclastname?: string) {
                                        this.email = email;
                                        this.firstname = firstname;
                                        this.lastname = lastname;      
                                        this.date = date;
                                        this.time = time;
                                        this.datetime = datetime;
                                        this.doclicense = doclicense;
                                        this.doclastname = doclastname;
    }
}
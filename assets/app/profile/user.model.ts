export class User {
    email: string;
    allergies?: string;
    password: string;
    firstname: string;
    lastname: string;
    gender: string;
    dob: string;
    insuranceprovider: string;
    
    constructor(email: string, 
                password: string, 
                firstname: string,
                lastname: string, 
                dob: string, 
                gender: string, 
                insuranceprovider: string,
                allergies?: string) {
                                        this.email = email;
                                        this.password = password;
                                        this.firstname = firstname;
                                        this.lastname = lastname;
                                        this.dob = dob;
                                        this.gender = gender;
                                        this.insuranceprovider = insuranceprovider;
                                        this.allergies = allergies;
    }

}
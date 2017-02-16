export class User {
    email: string;
    allergies?: string;
    password: string;
    firstname: string;
    lastname: string;
    gender: string;
    dob: string;
    insuranceprovider: string;
    
    constructor(email: string, password: string, firstname: string,
        lastname: string, gender: string, dob: string, insuranceprovider: string,
        allergies?: string) {
        this.email = email;
        this.allergies = allergies;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.dob = dob;
        this.insuranceprovider = insuranceprovider;
    }

}
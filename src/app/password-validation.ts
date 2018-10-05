import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; 
       let confirmPassword = AC.get('confirmpassword').value;
        if(password != confirmPassword) {
            console.log('false');
            AC.get('confirmpassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}
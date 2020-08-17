import validator from 'validator'
import isEmpty from 'lodash/isEmpty.js'

const userSignupInputValidator = ({ name, email, password, phone, city, states }) => {

    let errors = {}

    if (validator.isEmpty(name)) {
        errors.name = "This field is required"
    }

    // if (age < 18) {
    //     errors.age = "Age must be greater than 18"
    // }

    if (validator.isEmpty(email) && !validator.isEmail(email)) {
        errors.email = "Enter valid email"
    }

    if (validator.isEmpty(password) && password.length < 6) {
        errors.password = "Password must be more than 6 character long"
    }

    // if (!validator.equals(password, repassword)) {
    //     errors.repassword = "Password dont match"
    // }

    if (validator.isEmpty(phone) && phone.length < 10) {
        errors.phone = "Phone number is invalid"
    }

    // if (validator.isEmpty(blood)) {
    //     errors.blood = "Select one"
    // }

    if (validator.isEmpty(city)) {
        errors.city = "Select one"
    }

    if (validator.isEmpty(states)) {
        errors.states = "Select one"
    }

    return {
        isValid: isEmpty(errors),
        errors: errors
    }



}


const checkAndBundleNonEmptyFields=(inputObject)=>{

    let nonEmpty={};

    for(let i in inputObject){
        if(inputObject[i]!=='undefined' || inputObject[i].length!==0){
            nonEmpty[i]= inputObject[i]
        }
    }

    return nonEmpty;
}


const generate=(n)=> {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if ( n > max ) {
            return generate(max) + generate(n - max);
    }

    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    return ("" + number).substring(add); 
}

export { userSignupInputValidator, checkAndBundleNonEmptyFields, generate }
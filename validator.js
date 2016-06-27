'use strict';

const REGEX = {
    EMAIL: /([\w\.]+)@([\w\.]+)\.(\w+)/,
    phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
    punctuation: /[.,;:!?]/,
    hasLetters: /(\w)/,
    hasSpecial: /(\W)/,
    hasDigit: /(\d)/
};

// Add form validations in /signup for:
// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
// Email: Required. Must be formatted like an email, (something @ something . something)
// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898

var validator = {
    email: function(email) {
        //returns true if email is ok
        var valid = {
            messages: [],
            isValid: true
        };
        if (!REGEX.EMAIL.test(email)) {
            valid.messages.push('Email invalid');
            valid.isValid = false;
        }
        // console.log("valid: ", valid);
        return valid;
    },
    username: function(username) {
        var valid = {
            messages: [],
            isValid: true
        };
        // Username: Required.
        // Must be more than 6 characters,
        // must start with a letter,
        // and no punctuation.
        //length greater than
        if (username.length === 0) {
            return {
                messages: ['Username is required'],
                isValid: false
            }
        }
        if (username.length <= 6) {
            valid.messages.push('Username must be greater than 6 characters');
            valid.isValid = false;
        }
        //first char may not be a number
        if (!isNaN(username.split('')[0])) {
            valid.messages.push('Username must not start with a number.');
            valid.isValid = false;
        }
        //must not contain punctuation
        if (REGEX.punctuation.test(username)) {
            valid.messages.push('Username must not contain puncuation');
            valid.isValid = false;
        }
        return valid;
    },
    password: function(password) {
        var valid = {
            messages: [],
            isValid: true
        };
        // Password: Required.
        //Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
        if (password.length === 0) {
            return {
                messages: ['Your password cannot be empty, you idiot. Who the hell would try an empty password??'],
                isValid: false
            }
        }
        if (password.length <= 8) {
            valid.messages.push('Password must be greater than 8 characters');
            valid.isValid = false;
        }
        //must have letters
        if (!REGEX.hasLetters.test(password)) {
            valid.messages.push('Password must have letters');
            valid.isValid = false;
        }
        //must have digits
        if (!REGEX.hasDigit.test(password)) {
            valid.messages.push('Password have at least 1 digit');
            valid.isValid = false;
        }
        //must have special characters
        if (!REGEX.hasSpecial.test(password)) {
            valid.messages.push('Password have at least 1 special character');
            valid.isValid = false;
        }
        return valid;
    },
    first_name: function(name) {
        var valid = {
            messages: [],
            isValid: true
        };
        if (!name) {
            valid.messages.push('First name is required');
            valid.isValid = false;
        }
        return valid;
    },
    last_name: function(name) {
        var valid = {
            messages: [],
            isValid: true
        };
        if (!name) {
            valid.messages.push('First name is required');
            valid.isValid = false;
        }
        return valid;
    },
    phone_number: function(number) {
        var valid = {
            messages: [],
            isValid: true
        };
        if (!REGEX.phone.test(number)) {
            valid.messages.push('Invalid phone number entered');
            valid.isValid = false;
        }
        return valid;
    }
};



module.exports = validator;

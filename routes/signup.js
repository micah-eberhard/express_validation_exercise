'use strict';

var express = require('express');
var router = express.Router();

var validator = require('../validator');

// Write your form and validations inside this route file.


// Add form validations in /signup for:
// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
// Email: Required. Must be formatted like an email, (something @ something . something)
// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
//
// STRETCH: Hook up a database that you insert these values into after you've validated them.
// REMINDER: Don't store passwords in plain text.. Make sure you hash it first!

router.get('/', function(req, res){
  // Handle initial rendering here.
  res.render('signup', {errors: null, user:null});
});

router.post('/', function(req, res){
    // Handle rendering / redirecting here.
    var user = req.body;
    var errors = {};
    var hasError = false;

    var validated_username = validator.username(user.username);
    if (!validated_username.isValid) {
        errors.Username = validated_username;
        hasError = true;
    }

    var validated_password = validator.password(user.password);
    if (!validated_password.isValid) {
        errors.Password = validated_password;
        hasError = true;
    }

    var validated_email = validator.email(user.email);
    if (!validated_email.isValid) {
        errors.Email = validated_email;
        hasError = true;
    }

    var valdated_first_name = validator.first_name(user.first_name);
    if (!valdated_first_name.isValid) {
        errors['First Name'] = valdated_first_name;
        hasError = true;
    }

    var valdated_last_name = validator.last_name(user.last_name);
    if (!valdated_last_name.isValid) {
        errors['Last Name'] = valdated_last_name;
        hasError = true;
    }

    var validated_phone_number = validator.phone_number(user.phone_number);
    if (!validated_phone_number.isValid) {
        errors['Phone Number'] = validated_phone_number;
        hasError = true;
    }

    if (hasError) {
        res.render('signup', {errors: errors, user: user});
    } else {
        res.redirect('/');
    }
});



module.exports = router;

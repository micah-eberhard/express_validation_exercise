'use strict';

var express = require('express');
var router = express.Router();
var errors = {};
errors.functions = {};
errors.messages = {};
// Write your form and validations inside this route file.
errors.functions.username = function(input){
  var username = String(input);
  if(!username || username.length < 7 || !isNaN(username[0])|| username.search(/\W/) !== -1){
    return false;
  }else{
    return true;
  }
};
errors.messages.username = "Username must be more than 6 characters, must start with a letter, and no punctuation.";

// Add form validations in /signup for:
// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
errors.functions.password = function(input){
  var password = String(input);
  if(!password || password.length <9 || password.search(/[a-zA-Z]/) === -1 || password.search(/\d/) === -1 || password.search(/\W/) === -1){
    return false;
  }else{
    return true;
  }
};
errors.messages.password = "Password must be more than 8 characters with at least one letter, one number, and one special character.";
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
errors.functions.email = function(input){
  var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regex.test(input);
};
errors.messages.email = "Not a valid email address.";
// Email: Required. Must be formatted like an email, (something @ something . something)
errors.functions.firstName = function(input){
  if (input){
    return true;
  }else{
    return false;
  }
};
errors.functions.lastName = function(input){
  if(input){
    return true;
  }else{
    return false;
  }
};
errors.messages.firstName = "First Name is required.";
// First Name: Required.
errors.messages.lastName = "Last Name is required.";
// Last Name: Required.
errors.functions.phoneNumber = function(input){
  if(!input){
    return false;
  }
  for(var i = 0; i<input.length; i++){
    if(i === 3 || i === 7){
      if(input[i] !== "-"){
        return false;
      }
    }else if(isNaN(input[i])){
      return false;
    }
  }
  return true;
};
errors.messages.phoneNumber = "Must be a hyphenated 10 digit number formatted like: 012-345-6789";
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
//
// STRETCH: Hook up a database that you insert these values into after you've validated them.
// REMINDER: Don't store passwords in plain text.. Make sure you hash it first!
var info = {
  error: {},
  input: {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  },
  anyError: false,
  background: {}
};

router.get('/', function(req, res){
  // Handle initial rendering here.
  res.render('signup', info);
});

router.post('/', function(req, res){
  for (var key in errors.functions){
    info.input[key] = req.body[key];
    if(errors.functions[key](req.body[key])){
      info.error[key] = false;
      info.background[key] = "";
    }else{
      info.error[key] = errors.messages[key];
      info.background[key] = "pink";
    }
  }

    for(var item in info.error){
      if(info.background[item] === "pink"){
        res.render('signup', info);
        return
      }
    }

    info.input = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: ""
    };
    res.redirect("/");

});


// PRO-TIP: Write ALOT of functions to help you handle each little piece.


module.exports = router;

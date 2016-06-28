'use strict';

var express = require('express');
var router = express.Router();
var checkPost = require('../validation_tests');

// Write your form and validations inside this route file.
router.get('/', function(req,res){
  res.render('signup', {
    hasError: false, // dummy data so that you don't get an error
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    phonenumber: ''
  });
});

router.post('/', function(req,res){
  var formInfo = checkPost(req);
  if (!formInfo.hasError){
    res.redirect('/');
  } else {
    res.render('signup', formInfo);
  }
});

// Add form validations in /signup for:




// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
//
// STRETCH: Hook up a database that you insert these values into after you've validated them.
// REMINDER: Don't store passwords in plain text.. Make sure you hash it first!

router.get('/', function(req, res){
  // Handle initial rendering here.
  res.render('signup', {});
});

router.post('/', function(req, res){
  // Handle rendering / redirecting here.

  // If there arent any validation errors, redirect to '/'

  // If there are validation errors, re-render the signup page, injecting the users previous inputs.
  res.render('signup', {});

});


// PRO-TIP: Write ALOT of functions to help you handle each little piece.


module.exports = router;

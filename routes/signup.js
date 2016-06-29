'use strict';

var express = require('express');
var router = express.Router();

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
  res.render('signup', {
    hasError: false,
    username: '',
    // Password:'',
    // Email: '',
    // First_Name:'',
    // Last_Name:'',
    // Phone_Number:''
  });
});

router.post('/', function(req, res){
  // Handle rendering  redirecting here.
  var infoObj= checkData(req);
  if (infoObj.hasError){

    res.render('signup', infoObj);
  }
  else{
res.redirect('/');
}
});


// PRO-TIP: Write ALOT of functions to help you handle each little piece.
function checkData(req){
  var info={
    hasError : false
  };
  info.error={};
  checkRequired(info, req);
  checkUsername(info, req);
  return info;
}

function checkUsername(info, req){
  info.username = req.body.username;
  if(!info.error.username){
    info.error.username=[];
  }

  if(req.body.username.length <= 6){
    //make error
    // need this created only if it does not exist come back to this
    info.hasError=true;
    info.error.username.push({message : "username is too short!"});

  }
  if(req.body.username){
  var regex= /[A-Za-z]/;
  if(!req.body.username[0].match(regex)){
    info.hasError=true;
  info.error.username.push({message: "username Must start with a letter (a-z)"});
}
  regex = /\W/g;
  if(req.body.username.match(regex)){
    info.hasError=true;
    info.error.username.push({message:"username must be alphanumberic"});
  }
}
}

function checkRequired(info, req){
  for(var item in req.body){
    if(req.body[item].length <= 0)
    {
      if(!info.error[item])
      {
        info.error[item]=[];
      }
      info.hasError=true;
      info.error[item].push({message : item + " is required"});
    }
  }
}
//need to make an empty error array to push into
// function checkPhone(info, req){
//   console.log(req.body);
//   var phonearray=req.body.phoneNumber.split("-");
//   if (phonearray.length!== 3){
//     info.hasError = true;
//     info.error.phoneNumber.push({message : "phone number is invalid make sure it is formatted like ###-###-####"});
//   }
//   if(phonearray[0].length===3&& phonearray[1].length===3 && phonearray[2].length===4){
//     if(isNaN(phonearray[0])|| isNaN(phonearray[1])|| isNaN(phonearray[2])){
//       info.hasError = true;
//       info.error.phoneNumber.push({message : "please only numbers and dashes in phone number"});
//     }
//     else{
//       info.phoneNumber= req.body.phoneNumber;
//     }
//
//   }
//   else{
//     info.hasError =true;
//     info.error.phoneNumber.push({message: "phone number is the incorrect length"});
//   }
// }



module.exports = router;

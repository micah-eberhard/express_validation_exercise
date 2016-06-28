'use strict';

function checkPost(req){
  var info = {};
  info.hasError = false;
  info.error = {};
  checkUser(info, req);
  checkRequired(info,req);
  checkPassword(info, req);
  checkEmail(info,req);
  return info;
}


// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
function checkPassword(info, req){
  var pwd = req.body.password;
  info.password = req.body.password;
  if (pwd.length <= 8){
    info.hasError = true;
    info.error.password = [];
    info.error.password.push({ message: "Your password is too short. It has to have more than 8 characters." });
  }
  var regexAlpha = /[a-z][A-Z]/;
  var regexNum = /[0-9]/;
  var regexSpec = /[\[\]\^\$\.\|\?\*\+\(\)\\~`\!@#%&\-_+={}'""<>:;,]/;
  if (!regexAlpha.test(pwd)){
    info.hasError = true;
    if (!info.error.password){
      info.error.password = [];
    }
    info.error.password.push({message: "Your password needs to have at least one letter of the alphabet in it, like 'a' or 'z'. Also, who makes passwords with no letters in them, goofy?"});
  }

  if (!regexSpec.test(pwd)){
    info.hasError = true;
    if (!info.error.password){
      info.error.password = [];
    }
    info.error.password.push({message: "Your password needs a special character, like a '$' or '%'"});
  }

  if (!regexNum.test(pwd)){
    info.hasError = true;
    if (!info.error.password){
      info.error.password = [];
    }
    info.error.password.push({message: "Your password needs a number, like '1' or '4'"});
  }
  console.log(info.error);
}

// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
function checkUser(info, req){
  var str = req.body.username;
  if (str.length <= 6){
    // make error -- we want an error object to keep track of errors to display to user when page is rendered
    info.hasError = true;
    info.error.username = [];
    info.error.username.push({message: "Oops! Your username is invalid! It must  be longer than 6 characters"});

  }
  if (str.length > 0){
    var regex = /[A-Za-z]/;
    if (!str[0].match(regex)){
        if(!info.error.username){
          info.error.username = [];
        }
        info.hasError = true;
        info.error.username.push({message: "Oops! Your username is invalid! It must start with a character between A and Z"});
      }
    regex = /\W/g;
    if (str.match(regex)){
      if(!info.error.username){
        info.error.username = [];
      }
      info.hasError = true;
      info.error.username.push({message: "Oops! Your username is invalid! It has to have alphanumeric characters"});
      }
    }
      info.username = req.body.username;
  }

// Email: Required. Must be formatted like an email, (something @ something . something)
function checkEmail(info, req){
  var em = req.body.email;
  info.email = req.body.email;
  var atExists = false;
  var dotExists = false;
  var correctPlacement = false;
  for (var i = 0; i < em.length; i++){
    if (em[i] === '@' || atExists){
      if (atExists && em[i] === '.'){
        dotExists = true;
      }
    } atExists = true;
  }
  if (em[0] !== '@' && em[em.length-1] !== '.'){
    correctPlacement = true;
  }
  if (!(atExists && dotExists && correctPlacement)){
    info.hasError = true;
    info.error.username = [];
    info.error.username.push({message: 'Your email is invalid, try entering it again'});
  }
}


  function checkRequired(info, req){
    for(var item in req.body){
      if(req.body[item].length <= 0){
        if(!info.error[item]){
          info.error[item] = [];
        }
        info.hasError = true;
        info.error[item].push({message: item + " is required!"});
      }
    }
  }


module.exports = checkPost;

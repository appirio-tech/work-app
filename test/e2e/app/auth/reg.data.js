// store user data in maps for ease of use and readability...
//var rand = Math.floor((Math.random() * 100000) + 1);
var rand = new Date().getTime();
var RegData = function() {
  this.userList = [ 
  {'username': 'reg'+rand+'1', 'password': 'Appirio123', 'email':'rjain'+rand+'1'+'@appirio.com'},
  {'username': 'reg'+rand+'2', 'password': 'Appirio123', 'email':'rjain'+rand+'2'+'@appirio.com'},
  {'username': 'reg'+rand+'3', 'password': 'Appirio123', 'email':'rjain'+rand+'3'+'@appirio.com'}
  
  ],
  this.registerUrl = 'http://work.topcoder-dev.com/#/register';
};
module.exports = new RegData;
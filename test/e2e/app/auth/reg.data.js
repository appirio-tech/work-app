// store user data in maps for ease of use and readability...
var rand = Math.floor((Math.random() * 100000) + 1);
var RegData = function() {
  this.testUser = {'username': 'reg'+rand, 'password': 'Appirio123', 'email':'rjain'+rand+'@appirio.com'};
};
module.exports = new RegData;
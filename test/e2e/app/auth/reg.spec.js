// spec.js
var registrationPage = require('./reg.object');
var regUser = require('./reg.data');
describe('registration', function() {
  it('register the user', function() {
    registrationPage.get();
    registrationPage.register(regUser.testUser);   
  });
});
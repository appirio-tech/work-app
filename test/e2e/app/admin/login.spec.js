// spec.js
 var loginPage = require('loginPage');
 var loginUser = require('loginData');
describe('login', function() {
  it('welcomes the user', function() {
    //var loginPage = new LoginPage();
    loginPage.get();
    loginPage.login(loginUser.testUser);
  });
});
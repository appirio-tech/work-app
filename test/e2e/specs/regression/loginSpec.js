// spec.js
 var loginPage = require('/Volumes/Data/gitDemand/ap-work-client/test/e2e/pages/loginPage');
 var loginUser = require('/Volumes/Data/gitDemand/ap-work-client/test/e2e/data/loginData');
describe('login', function() {
  it('welcomes the user', function() {
    //var loginPage = new LoginPage();
    loginPage.get();
    loginPage.login(loginUser.testUser);
  });
});
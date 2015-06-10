// spec.js
 var loginPage = require('./login.object');
 var loginUser = require('./login.data');
describe('login', function() {
  it('welcomes the user', function() {
    //var loginPage = new LoginPage();
    loginPage.get();
    loginPage.login(loginUser.testUser);
    
  });
  
  it('welcomes the user for logout', function() {
	    //var loginPage = new LoginPage();
	  loginPage.newProject();
	    
	  });
  
  
});
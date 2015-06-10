var loginPage = require('../auth/login.object');
var loginUser = require('./manage.data');
var managePage = require('./manage.object');

describe('login', function() {
	  it('welcomes the user', function() {
	    //var loginPage = new LoginPage();
	    loginPage.get();
	    loginPage.login(loginUser.testUser);
	    
	  });
	  
	  it('Click on Project Manage link', function() {
		    //var loginPage = new LoginPage();
		  console.log('manage page'+managePage);
		  managePage.continueSetup();
		  console.log('manage page'+managePage);
		    
	  });
	  
	  it('Click on Project Manage link 2', function() {
		    //var loginPage = new LoginPage();
		  console.log('manage page editProject');
		  managePage.editProject();
		  console.log('manage page editProjectrpp');
		    
	  });
	  
	  
	  
	  
});
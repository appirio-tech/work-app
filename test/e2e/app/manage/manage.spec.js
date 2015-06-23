var loginPage = require('../auth/login.object');
var loginUser = require('./manage.data');
var managePage = require('./manage.object');

describe('login', function() {
	  it('welcomes the user again', function() {
	    //var loginPage = new LoginPage();
	    loginPage.get(loginUser.testUser);
	    loginPage.login(loginUser.testUser);
	    
	  });
	  
	  it('Click on Project Manage link', function() {
		    //var loginPage = new LoginPage();
		  console.log('manage page'+managePage);
		  managePage.continueSetup();
		  console.log('manage page'+managePage);
		    
	  });
	  
	  /*it('Click on Project Manage link 2', function() {
		    //var loginPage = new LoginPage();
		  console.log('manage page editProject');
		  managePage.editProject();
		  console.log('manage page editProjectrpp');
		    
	  });*/
	  
	  afterEach(function() {  
		    browser.manage().logs().get('browser').then(function(browserLog) {
		        var i = 0,
		            severWarnings = false;

		        for(i; i<=browserLog.length-1; i++){
		            if(browserLog[i].level.name === 'SEVERE'){
		                console.log('\n' + browserLog[i].level.name);
		                //uncomment to see the error
		                console.log('(Possibly exception) \n' + browserLog[i].message);

		                severWarnings = true;
		            }
		        }

//		        expect(severWarnings).toBe(false);
		    });
		});
	  
	  
	  
	  
});
// spec.js
 var loginPage = require('./login.object');
 var loginUser = require('./login.data');
describe('login', function() {
  it('welcomes the user', function() {
    //var loginPage = new LoginPage();
    loginPage.get(loginUser.testUser);
    loginPage.login(loginUser.testUser);
    
  });
  
  it('welcomes the user for logout', function() {
	    //var loginPage = new LoginPage();
	  loginPage.logOut();
	    
  });
  
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

//	        expect(severWarnings).toBe(false);
	    });
	});
  
  
});
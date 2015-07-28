// spec.js
var registrationPage = require('./reg.object');
var regUser = require('./reg.data');
describe('registration', function() {
	var i=0;
	 for (; i< regUser.userList.length; i++) {
		 console.log('reg user :'+regUser.userList[i].username);
		 (function(userInfo) {
  
			 it('register the user', function() {
				 registrationPage.get(regUser.registerUrl);
				 registrationPage.register(userInfo);   
			 });
			 
			 afterEach(function() {  
				 browser.manage().logs().get('browser').then(function(browserLog) {
					 var i = 0,
					 severWarnings = false;

					 for(i; i <= browserLog.length-1; i++){
						 if(browserLog[i].level.name === 'SEVERE'){
//							 console.log('\n' + browserLog[i].level.name);
							 //uncomment to see the error
							 console.log('(Possibly exception) \n' + browserLog[i].message);

							 severWarnings = true;
						 }
					 }
					 //remove it to run test case even if test case is successful
//					 expect(severWarnings).toBe(false);
				 });
			 });
		 })(regUser.userList[i]);
	 }
});
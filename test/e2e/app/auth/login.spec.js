// spec.js
 var loginPage = require('./login.object');
 var loginUser = require('./login.data');
 
 
 
	 describe('login', function() {
//		 console.log('user creds :'+loginUser.userCredentials[0].username);
		 console.log(loginUser.userCredentials.length);
		 var i=0;
		 for (; i< loginUser.userCredentials.length; i++) {
			 console.log('user creds :'+loginUser.userCredentials[i].username);
			 (function(loginUserCred) {
				 it('welcomes the user', function() {
					 console.log('user creds :'+loginUserCred.username);
					 //var loginPage = new LoginPage();
					 loginPage.get(loginUser.baseUrl);
					 loginPage.login(loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
					 //var loginPage = new LoginPage();
					 loginPage.logOut();
				 });
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(loginUser.userCredentials[i]);
			 
			 
			 
			 
			 
		/**	 
			 
			 var loginUserCred = loginUser.userCredentials[i];
			 
			 console.log('user creds :'+loginUserCred.username);
		 it('welcomes the user', function(loginUserCred) {
			 //var loginPage = new LoginPage();
			 console.log('user creds :'+loginUserCred.username);
			 loginPage.get(loginUser.baseUrl);
			 console.log('user creds :'+loginUserCred.username);//+loginUser.userCredentials[i].username);
			 loginPage.login(loginUserCred);
		 });
  
		 it('welcomes the user for logout', function() {
			 //var loginPage = new LoginPage();
			 loginPage.logOut();
		 });
  
		 afterEach(function() {  
			 browser.manage().logs().get('browser').then(function(browserLog) {
				 var i = 0,
				 severWarnings = false;

				 for(i; i <= browserLog.length-1; i++){
					 if(browserLog[i].level.name === 'SEVERE'){
						 console.log('\n' + browserLog[i].level.name);
						 //uncomment to see the error
						 console.log('(Possibly exception) \n' + browserLog[i].message);

						 severWarnings = true;
					 }
				 }
				 //remove it to run test case even if test case is successful
				 expect(severWarnings).toBe(false);
			 });
		 });
		 }**/
		 }
  
});

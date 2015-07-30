var loginPage = require('../auth/login.object');
var manageData = require('./manage.data');
var managePage = require('./manage.object');

	describe('login', function() {
		
		
	  it('welcomes the user again', function() {
	    //var loginPage = new LoginPage();
	    loginPage.get(manageData.baseUrl);
	    loginPage.login(manageData.userCredentials[0]);
	  });
	  
	  var i=0;
	  for(;i < manageData.projectList.length; i++) {
		  (function(project) {
			  it('Click on Project Manage link', function() {
				  managePage.createNewProject();
				  console.log('manage page'+managePage);
				  loginPage.get(manageData.manageProjectUrl);
				  managePage.continueSetup(project);
			  });
			  
			  it('Go back to manage project link', function() {
				  console.log('manage page'+managePage);
				  loginPage.get(manageData.manageProjectUrl);
//				  managePage.continueSetup(project);
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
	  
	  })(manageData.projectList[i]);
	  }
	  
	  
	  
});
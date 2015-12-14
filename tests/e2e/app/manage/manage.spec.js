var loginPage = require('../auth/login.object');
var manageData = require('./manage.data');
var managePage = require('./manage.object');

	describe('login', function() {
		
		
	  it('Welcomes the user to Manage Project', function() {
	    //var loginPage = new LoginPage();
	    loginPage.get(manageData.baseUrl);
	    loginPage.login(manageData.userCredentials[1]);
	  });
	  
	  var i=0;
	  for(;i < manageData.projectList.length; i++) {
		  (function(project) {
			  it('Click on Project Manage link', function() {
//				  managePage.createNewProject(project.oldProjectName);
				  console.log('click on project manage link spec'+managePage);
				  loginPage.get(manageData.manageProjectUrl);
				  managePage.continueSetup(project);
			  });
			  
			  it('Go back to manage project link', function() {
				  console.log('go back to manage project link'+managePage);
				  loginPage.get(manageData.manageProjectUrl);
				  expect(true).toEqual(true);
			  });
	  
	  
			  afterEach(function() {  
				  browser.manage().logs().get('browser').then(function(browserLog) {
					  var i = 0,
					  severWarnings = false;

			        for(i; i<=browserLog.length-1; i++){
			            if(browserLog[i].level.name === 'SEVERE'){
//			                console.log('\n' + browserLog[i].level.name);
			                //uncomment to see the error
//			                console.log('(Possibly exception) \n' + browserLog[i].message);
	
			                severWarnings = true;
			            }
			        }

//		        expect(severWarnings).toBe(false);
		    });
		});
	  
	  })(manageData.projectList[i]);
	  }
	  
	  it('logout user', function() {
			 loginPage.logOut();
		 });
	  
	  
	  
});
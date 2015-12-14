var loginPage = require('../auth/login.object');
var messagingData = require('./messaging.data');
var messagingPage = require('./messaging.object');
var newProjectData = require('../manage/newproject.data');
var newProject = require('../manage/newproject.object');
var projectClaimData = require('../projects/projects-claim.data');
var projectClaimPage = require('../projects/projects-claim.object');


	describe('login', function() {
		
	  it('Welcomes the user to Manage Project', function() {
	    //var loginPage = new LoginPage();
	    loginPage.get(messagingData.baseUrl);
	    loginPage.login(messagingData.userCredentials[1]);
	  });
	  /*
	  var i=0;
	  for(;i < messagingData.projectList.length; i++) {
		  (function(project) {
			  it('Click on Project Manage link', function() {
//				  messagingPage.createNewProject(project.oldProjectName);
				  newProject.createNewProject(project);
				  console.log('click on project manage link spec'+messagingPage);
				  loginPage.get(messagingData.manageProjectUrl);
				  messagingPage.messageByTimeLinePage(project);
			  });
			  
			  it('Go back to manage project link', function() {
				  console.log('go back to manage project link'+messagingPage);
				  loginPage.get(messagingData.manageProjectUrl);
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
	  
	  })(messagingData.projectList[i]);
	  }
	  
	  it('logout user', function() {
			 loginPage.logOut();
	  });
	  
	  it('Welcomes the copilot', function() {
		    //var loginPage = new LoginPage();
		    loginPage.get(messagingData.baseUrl);
		    loginPage.login(messagingData.userCredentials[0]);
	  });
	 
	  var i=0;
	  for(;i < messagingData.projectList.length; i++) {
		  (function(project) {
			  it('Copilot on Project Manage Page', function() {
//				  messagingPage.createNewProject(project.oldProjectName);
				  console.log('Copilot on Project Manage Page');
//				  loginPage.get(messagingData.manageProjectUrl);
//				  projectClaimPage.claimAnyOpenProject(project, projectClaimData.openProjectsUrl);
				  messagingPage.messageInMyProjects(project, projectClaimData.openProjectsUrl);
			  });
			  
			  it('Go back to manage project link', function() {
				  console.log('go back to manage project link'+messagingPage);
				  loginPage.get(messagingData.manageProjectUrl);
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
	  
	  })(messagingData.projectList[i]);
	  }
	  
	  it('logout user', function() {
			 loginPage.logOut();
	  });
	  
	  */
	  
	  //message box test case
	  
	  
	  var i=0;
	  for(;i < messagingData.projectList.length; i++) {
		  (function(project) {
			  it('Click on Project Manage link', function() {
//				  messagingPage.createNewProject(project.oldProjectName);
				  messagingPage.clickMessageNotification(project);
//				  newProject.createNewProject(project);
//				  console.log('click on project manage link spec'+messagingPage);
//				  loginPage.get(messagingData.manageProjectUrl);
//				  messagingPage.messageByTimeLinePage(project);
			  });
			  
//			  it('Go back to manage project link', function() {
//				  console.log('go back to manage project link'+messagingPage);
//				  loginPage.get(messagingData.manageProjectUrl);
//				  expect(true).toEqual(true);
//			  });
//	  
	  
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
	  
	  })(messagingData.messageBoxMessageList[i]);
	  }
	  
	  
	  
});
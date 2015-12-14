var loginPage = require('../auth/login.object');
//var loginUser = require('./login.data');
var projectList = require('./projects-claim.data');
var newProject = require('./projects-claim.object');

describe('login', function() {
	  
	it('welcomes the user new project', function() {
		console.log('project new '+projectList.baseUrl);
	    loginPage.get(projectList.baseUrl);
	    loginPage.login(projectList.userCredentials[0]);
	  });
	
	var i=0;
	  for(;i < projectList.estimateProjectList.length; i++) {
		  (function(project) {
			  it('Click on open project button', function () {
				  newProject.get(projectList.manageProjectUrl);
				  newProject.claimAnyOpenProject(project, projectList.openProjectsUrl);
			  });
			  /**
			  it('Click on open project button', function () {
				  newProject.get(projectList.manageProjectUrl);
				  newProject.estimateAnyClaimedProject(project);
			  });**/
		  })(projectList.estimateProjectList[i]);
	  }
	
	
	
	
	  
//	  var i=0;
//	  for(;i < projectList.projectList.length; i++) {
//		  (function(project) {
//	  
//		  it('Click on Project new link', function() {
//			    //var loginPage = new LoginPage();
//			  newProject.createNewProject(project);
//		  });
//		  
//		  it('Click on Project new link 2', function() {
//			    //var loginPage = new LoginPage();
//			  console.log('manage page editProject'+projectList.manageProjectUrl);
//			  newProject.get(projectList.manageProjectUrl);
//	//		  newProject.editProject();
//		  });
//	  
//		  afterEach(function() {  
//			    browser.manage().logs().get('browser').then(function(browserLog) {
//			        var i = 0,
//			        severWarnings = false;
//	
//			        for(i; i<=browserLog.length-1; i++){
//			            if(browserLog[i].level.name === 'SEVERE'){
////			                console.log('\n' + browserLog[i].level.name);
//			                //uncomment to see the error
////			                console.log('(Possibly exception) \n' + browserLog[i].message);
//	
//			                severWarnings = true;
//			            }
//			        }
//	
//	//		        expect(severWarnings).toBe(false);
//			    });
//			});
//		  })(projectList.projectList[i]);
//	  }
	  
});
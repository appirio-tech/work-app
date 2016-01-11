var loginPage = require('../auth/login.object');
var projectData = require('./project-details.data');
var projectPage = require('./project-details.object');

describe('login', function() {
	  
	it('Login', function() {
	    loginPage.get(projectData.baseUrl);
	    loginPage.login(projectData.userCredentials[0]);
	 });
	
	 var i=0;
	  for(;i < projectData.projectList.length; i++) {
		  (function(project) {
	
			it('Go to Project Page', function() {
				projectPage.goToSpecificProjecetDetails(project);
			 });
			
//			it('Validate device', function() {
//				projectPage.validateData(project);
//			});
			
			it('Validate Design Data', function() {
				projectPage.validateDesignData(project);
			});
		  })(projectData.projectList[i]);
	  }
	  
});
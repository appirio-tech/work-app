var loginPage = require('../auth/login.object');
var loginUser = require('./manage.data');
var newProject = require('./newproject.object');

describe('login', function() {
	  it('welcomes the user new project', function() {
	    //var loginPage = new LoginPage();
	    loginPage.get(loginUser.testUser);
	    loginPage.login(loginUser.testUser);
	    
	  });
	  
	  it('Click on Project new link', function() {
		    //var loginPage = new LoginPage();
		  console.log('create new project page'+newProject);
		  newProject.createNewProject();
		  console.log('manage new project page'+newProject);
		    
	  });
	  
	  it('Click on Project new link 2', function() {
		    //var loginPage = new LoginPage();
		  console.log('manage page editProject');
		  newProject.get();
//		  newProject.editProject();
		  console.log('manage page editProjectrpp');
		    
	  });
	  
	  
	  
	  
});
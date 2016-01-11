var loginPage = require('../auth/login.object');
//var loginUser = require('./manage.data');
var newProject1 = require('./dashboard.object');
var newProjectData = require('./dashboard.data');
//var newProject1 = require('./newproject.object');

describe('login', function() {
	  
	it('Login', function() {
	    loginPage.get(newProjectData.baseUrl);
	    loginPage.login(newProjectData.userCredentials[0]);
	 });
	  
	  
	it('Project List', function() {
		newProject1.createNewProject(project);
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
	  
	  
	  
	  
	  
	  
	  
});
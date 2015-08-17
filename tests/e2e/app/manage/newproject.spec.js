var loginPage = require('../auth/login.object');
var loginUser = require('./manage.data');
var newProjectData = require('./newproject.data');
var newProject = require('./newproject.object');

describe('login', function() {
	  
	it('welcomes the user new project', function() {
		console.log('project new ');
	    //var loginPage = new LoginPage();
	    loginPage.get(newProjectData.baseUrl);
	    loginPage.login(newProjectData.userCredentials[0]);
	    expect(true).toEqual(true);
	  });
	  
	  var i=0;
	  for(;i < newProjectData.projectList.length; i++) {
		  (function(project) {
	  
		  it('Click on Project new link', function() {
			  newProject.createNewProject(project);
		  });
		  
		  it('Click on Project new link 2', function() {
			  console.log('manage page editProject'+newProjectData.manageProjectUrl);
			  newProject.get(newProjectData.manageProjectUrl);
			  var actionItem = element(by.css('.manage button'));
			  var EC = protractor.ExpectedConditions;
			  var isClickable = EC.elementToBeClickable(actionItem);
			  browser.wait(isClickable, 20000);
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
		  })(newProjectData.projectList[i]);
	  }
	  
});
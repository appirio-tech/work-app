var loginPage = require('../auth/login.object');
//var loginUser = require('./manage.data');
var newProject1 = require('./newproject.object');
var newProjectData = require('./newproject.data');
//var newProject1 = require('./newproject.object');

describe('login', function() {
	  
	it('Login', function() {
	    loginPage.get(newProjectData.baseUrl);
	    loginPage.login(newProjectData.userCredentials[0]);
	 });
	  
	  var i=0;
	  for(;i < newProjectData.projectList.length; i++) {
		  (function(project) {
	  
		  it('Click on Project new link', function() {
			  newProject1.createNewProject(project);
		  });
		  
		  it('Define Features', function() {
			  newProject1.finishRequirementsAgainNew(project, newProjectData.featureList, newProjectData.selectedFeatureColor);
		  });
		  
		  it('Upload Requirements', function() {
			  newProject1.uploadRequirements(project);
		  });
		  
		  
		  it('Define My Design Validations', function() {
			  newProject1.defineMyDesignValidations(project, newProjectData.design);
		  });
		  
		  
		  it('Go to Design', function() {
			  newProject1.goToDesign(project, newProjectData.design);
		  });
		  
		  it('Use/Upload Brand GuideLine', function() {
			  newProject1.useBrandGuideline(project, newProjectData.design);
		  });
		  
		  it('Wrong Style Url', function() {
			  newProject1.getStyleFromWrongUrl(project, newProjectData.errMsg.wrongUrlErrMsg);
		  });
		  
		  it('Get Style from Url', function() {
			  newProject1.getStyleFromUrl(project);
		  });
		  
		  if(project.type == 'DESIGN & DEVELOPMENT') {
			  it('Define Requirements', function() {
				  newProject1.defineDevRequirements(project, newProjectData.develop);
			  });
			  
			  it('Upload Technical Requirements', function() {
				  newProject1.uploadTechnicalRequirements(project, newProjectData.develop);
			  });
		  }
		  
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
	  
	  
	  
	  
	  /*
	  i = 0;
	  for(;i < newProjectData.projectList.length; i++) {
		  (function(project) {
	  
//		  it('Click on Project new link', function() {
//			  newProject1.createNewProject(project);
//		  });
		  
//		  it('Add Remove Feature', function() {
//			  newProject1.addRemoveFeature(project, newProjectData.featureList, newProjectData.selectedFeatureColor);
//		  });
		  
		  it('Define and add Feature', function() {
			  newProject1.finishRequirementsAgainNew(project, newProjectData.featureList, newProjectData.selectedFeatureColor);
		  });
		  
		  it('Upload Requirements', function() {
			  newProject1.finishRequirementsAgainNew(project, newProjectData.featureList, newProjectData.selectedFeatureColor);
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
	  */
	  
	  
	  
	  
	  
//	  i = 0;
//	  for(;i < newProjectData.noDeviceTypeProjectList.length; i++) {
//		  (function(project) {
//	  
//		  it('Create Project - No Device', function() {
//			  newProject1.createNewProject(project);
//		  });
//		  
//	  
//		  })(newProjectData.noDeviceTypeProjectList[i]);
//	  }
	  
//	  i = 0;
//	  for(;i < newProjectData.noOrientationProjectList.length; i++) {
//		  (function(project) {
//	  
//		  it('Create Project - No Orientation', function() {
//			  newProject1.createNewProject(project, newProjectData.errMsg);
//		  });
//	  
//		  })(newProjectData.noOrientationProjectList[i]);
//	  }
	  
//	  i = 0;
//	  for(;i < newProjectData.noWorkTypeProjectList.length; i++) {
//		  (function(project) {
//	  
//		  it('Create Project - No work type', function() {
//			  newProject1.createNewProject(project, newProjectData.errMsg);
//		  });
//	  
//		  })(newProjectData.noWorkTypeProjectList[i]);
//	  }
	  
	  
//	  i = 0;
//	  for(;i < newProjectData.allWorkTypeProjectList.length; i++) {
//		  (function(project) {
//	  
//		  it('Create Project - All work type', function() {
//			  newProject1.allWorkTypeProject(project, newProjectData.errMsg);
//		  });
//	  
//		  })(newProjectData.allWorkTypeProjectList[i]);
//	  }
//	  
//	  i = 0;
//	  for(;i < newProjectData.noOverviewProjectList.length; i++) {
//		  (function(project) {
//	  
//		  it('Create Project - No overview', function() {
//			  newProject1.createNewProject(project, newProjectData.errMsg);
//		  });
//	  
//		  })(newProjectData.noOverviewProjectList[i]);
//	  }
	  
	  
	  
});
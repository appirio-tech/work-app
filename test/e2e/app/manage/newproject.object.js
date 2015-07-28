var NewProjectPage = function() {
	
	this.get = function(baseUrl) {
		browser.get(baseUrl);
	}

	
	this.createNewProject = function(project) {
		browser.ignoreSynchronization = true;
		var actionItem = element(by.css('.heading button'));
		console.log('actionItem '+actionItem);
		var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(actionItem);
		browser.wait(isClickable, 20000);
		
		console.log('click action item new project');
    
		actionItem.click().then(function() {
	    	var workName = element(by.model('vm.work.name'));
	    	console.log('label item'+workName);
	    	var workNameText = workName.getText();
	    	console.log('workNameText '+workNameText);
	    	workName.clear();
	    	workName.sendKeys(project.name);
	    	console.log('project.name '+project.type);
	    	var submitButton = element(by.css('.success'));
	    	var isClickable = EC.elementToBeClickable(submitButton);
			browser.wait(isClickable, 20000);
	    	submitButton.click().then(function() {
	    		var projectType = null;
	    		if(project.type == 'Design') {
	    			console.log('design');
	    			projectType = element(by.id('project-type-design'));
	    		} else if(project.type == 'Code') {
	    			console.log('code');
	    			projectType = element(by.id('project-type-code'));
	    		} else if(project.type == 'Design-Code') {
	    			console.log('design-code');
	    			projectType = element(by.id('project-type-design-code'));
	    		}
	    		console.log('projectType 0 '+projectType);
	    		var isClickable = EC.elementToBeClickable(projectType);
				browser.wait(isClickable, 20000);
	    		projectType.click().then(function() {
	    			console.log('projectType '+projectType);
	    			submitButton = element(by.css('.submit'));
	    	    	var isClickable = EC.elementToBeClickable(submitButton);
	    	    	browser.wait(isClickable, 20000);
	    			console.log('submitButton'+submitButton);
	    			submitButton.click().then(function() {
	    				var yesNoUpload = null;
//	    				var cancelButton = element(by.css('.cancel'));
//	    				cancelButton.click().then(function() {
	    				if(project.upload == 'yes') {
	    					yesNoUpload = element(by.css('.yes'));
	    				} else {
	    					yesNoUpload = element(by.css('.no'));
	    				}
	    				var isClickable = EC.elementToBeClickable(yesNoUpload);
		    	    	browser.wait(isClickable, 30000);
	    				yesNoUpload.click().then(function(){
	    					
	    					if(project.upload != 'yes') {
	    						var workSummary = element(by.model('vm.work.summary'));
	    						workSummary.clear();
	    						workSummary.sendKeys(project.workSummary);
	    					}
	    					console.log('yesNoupload'+submitButton);
	    					submitButton = element(by.name('elevatorForm')).all(by.css('.submit')).first();
//	    					submitButton = element.all(by.css('.submit')).get(1);
	    					console.log('competitorsLink '+submitButton);
	    			    	var isClickable = EC.elementToBeClickable(submitButton);
	    			    	browser.wait(isClickable,20000);
	    			    	submitButton.click().then(function(){
	    			    		console.log('in competitors click');
	    						submitButton = element(by.name('competitorForm')).all(by.css('.submit')).first();
	    						var isClickable = EC.elementToBeClickable(submitButton);
		    			    	browser.wait(isClickable, 20000);
	    						submitButton.click().then(function(){
	    							console.log('in competitors click'+submitButton);
	    							var isClickable = EC.elementToBeClickable(submitButton);
			    			    	browser.wait(isClickable, 20000);
	    							var description = element(by.model('vm.work.usageDescription'));
	    							description.clear();
	    							description.sendKeys(project.description);
	    							submitButton = element(by.name('usersForm')).all(by.css('.submit')).first();
	    							var isClickable = EC.elementToBeClickable(submitButton);
			    			    	browser.wait(isClickable, 20000);
	    							submitButton.click().then(function(){
	    								console.log('feature List');
	    								for(var j=0; j < project.featureList.length; j++) {
	    									if(project.featureList[j].featureName == 'login') {
	    										var featureLogin = element(by.id('feature-login'));
	    										var isClickable = EC.elementToBeClickable(featureLogin);
	    				    			    	browser.wait(isClickable, 20000);
	    	    								featureLogin.click();
	    	    								var explanation = element(by.model('feature.explanation'));
	    	    								var isClickable = EC.elementToBeClickable(explanation);
	    				    			    	browser.wait(isClickable, 20000);
	    	    								explanation.sendKeys(project.featureList[j].explanation);
	    									} else if(project.featureList[j].featureName == 'profiles') {
	    										var featureProfiles = element(by.id('feature-profiles'));
	    										var isClickable = EC.elementToBeClickable(featureProfiles);
	    				    			    	browser.wait(isClickable, 20000);
	    										featureProfiles.click();
	    										var explanation = element.all(by.model('feature.explanation')).get(2);
	    										var isClickable = EC.elementToBeClickable(explanation);
	    				    			    	browser.wait(isClickable, 20000);
	    	    								explanation.sendKeys(project.featureList[j].explanation);
	    									} else if(project.featureList[j].featureName == 'forms') {
	    										var featureForms = element(by.id('feature-forms'));
	    										var isClickable = EC.elementToBeClickable(featureForms);
	    				    			    	browser.wait(isClickable, 20000);
	    										featureForms.click();
	    										var explanation = element.all(by.model('feature.explanation')).get(4);
	    										var isClickable = EC.elementToBeClickable(explanation);
	    				    			    	browser.wait(isClickable, 20000);
	    	    								explanation.sendKeys(project.featureList[j].explanation);
	    									}  else if(project.featureList[j].featureName == 'social') {
	    										var featureSocial = element(by.id('feature-social-login'));
	    										var isClickable = EC.elementToBeClickable(featureSocial);
	    				    			    	browser.wait(isClickable, 20000);
	    										featureSocial.click();
	    										var explanation = element.all(by.model('feature.explanation')).get(1);
	    										var isClickable = EC.elementToBeClickable(explanation);
	    				    			    	browser.wait(isClickable, 20000);
	    	    								explanation.sendKeys(project.featureList[j].explanation);
	    									} else if(project.featureList[j].featureName == 'map') {
	    										var featureMap = element(by.id('feature-map'));
	    										var isClickable = EC.elementToBeClickable(featureMap);
	    				    			    	browser.wait(isClickable, 20000);
	    										featureMap.click();
	    										var explanation = element.all(by.model('feature.explanation')).get(3);
	    										var isClickable = EC.elementToBeClickable(explanation);
	    				    			    	browser.wait(isClickable, 20000);
	    	    								explanation.sendKeys(project.featureList[j].explanation);
	    									} else if(project.featureList[j].featureName == 'listing') {
	    										var featureListing = element(by.id('feature-listing'));
	    										var isClickable = EC.elementToBeClickable(featureListing);
	    				    			    	browser.wait(isClickable, 20000);
	    										featureListing.click();
	    										var explanation = element.all(by.model('feature.explanation')).get(5);
	    										var isClickable = EC.elementToBeClickable(explanation);
	    				    			    	browser.wait(isClickable, 20000);
	    	    								explanation.sendKeys(project.featureList[j].explanation);
	    									} else if(project.featureList[j].featureName == 'new-feature') {
	    										var newFeature = element(by.model('vm.newFeature'));
	    										var isClickable = EC.elementToBeClickable(newFeature);
	    				    			    	browser.wait(isClickable, 20000);
	    										newFeature.click();
	    										var newFeatureName = element(by.model('vm.newFeatureName'));
	    										var isClickable = EC.elementToBeClickable(newFeatureName);
	    				    			    	browser.wait(isClickable, 20000);
	    										newFeatureName.sendKeys(project.featureList[j].name);
	    										var newFeatureExplanation = element(by.model('vm.newFeatureExplanation'));
	    										var isClickable = EC.elementToBeClickable(newFeatureExplanation);
	    				    			    	browser.wait(isClickable, 20000);
	    										newFeatureExplanation.sendKeys(project.featureList[j].explanation);
	    									} 
	    									
	    								}
	    								submitButton = element(by.name('featureForm')).all(by.css('.submit')).first();
	    								var isClickable = EC.elementToBeClickable(submitButton);
	    		    			    	browser.wait(isClickable, 20000);
	    								submitButton.click().then(function(){
	    									submitButton = element(by.name('designForm')).all(by.css('.submit')).first();
	    									var isClickable = EC.elementToBeClickable(submitButton);
		    		    			    	browser.wait(isClickable, 20000);
	    									submitButton.click().then(function(){
	    										var submitWork = element(by.id('submit-work-accept-terms'));
	    										var isClickable = EC.elementToBeClickable(submitWork);
	        			    			    	browser.wait(isClickable, 20000);
	    										submitWork.click();
	        									submitButton = element(by.css('.launch'));
	        									var isClickable = EC.elementToBeClickable(submitButton);
	        			    			    	browser.wait(isClickable, 20000);
	        									submitButton.click().then(function(){
	        										//console.log('hii testing complete');
	        										expect(true).toEqual(true);
	        									})
	        								});
	    									
	    								});
	    							});
	    							
	    						});
	    					});
	    				});
	    			});
	    		});
	    	});
    });
  };
};
module.exports = new NewProjectPage();
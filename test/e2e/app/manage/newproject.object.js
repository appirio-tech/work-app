var NewProjectPage = function() {
	
	this.get = function(browseUrl) {
		browser.get(browseUrl);
	}

	
	
	this.createNewProject = function(project) {
		var actionItem = element(by.css('.heading button'));
		var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(actionItem);
		browser.wait(isClickable, 10000);
		
		console.log('click action item new project');
    
		actionItem.click().then(function() {
	    	var workName = element(by.model('vm.work.name'));
	    	console.log('label item'+workName);
	    	var workNameText = workName.getText();
	    	console.log('workNameText '+workNameText);
	    	workName.clear();
	    	workName.sendKeys(project.name);
	    	var submitButton = element(by.css('.submit'));
	    	submitButton.click().then(function() {
	    		var projectTypeDesign = null;
	    		if(project.type == 'Design') {
	    			projectTypeDesign = element(by.id('project-type-design'));
	    		} else {
	    			projectTypeDesign = element(by.id('project-type-design'));
	    		}
	    		projectTypeDesign.click().then(function() {
	    			console.log('projectTypeDesign'+projectTypeDesign);
	    			submitButton = element(by.css('.submit'));
	    			console.log('submitButton'+submitButton);
	    			submitButton.click().then(function() {
	    				var yesNoUpload = null;
	    				var cancelButton = element(by.css('.cancel'));
	//    				cancelButton.click().then(function() {
	    				if(project.upload == 'yes') {
	    					yesNoUpload = element(by.css('.yes'));
	    				} else {
	    					yesNoUpload = element(by.css('.no'));
	    				}
	    				yesNoUpload.click().then(function(){
	    					
	    					if(project.upload != 'yes') {
	    						var workSummary = element(by.model('vm.work.summary'));
	    						workSummary.clear();
	    						workSummary.sendKeys(project.workSummary);
	    					}
	    					submitButton.click().then(function(){
	    						submitButton = element(by.css('.submit'));
	    						submitButton.click().then(function(){
	    							var description = element(by.model('vm.work.usageDescription'));
	    							description.clear();
	    							description.sendKeys(project.description);
	    							submitButton = element(by.css('.submit'));
	    							submitButton.click().then(function(){
	    								
	    								for(var j=0; j < project.featureList.length; j++) {
	    									if(project.featureList[j] == 'login') {
	    										var featureLogin = element(by.id('feature-login'));
	    	    								featureLogin.click();
	    									} else if(project.featureList[j] == 'login') {
	    										
	    									}
	    									
	    								}
	    								submitButton = element(by.css('.submit'));
	    								submitButton.click().then(function(){
	    									submitButton = element(by.css('.submit'));
	    									submitButton.click().then(function(){
	    										var submitWork = element(by.id('submit-work-accept-terms'));
	    										submitWork.click();
	        									submitButton = element(by.css('.launch'));
	        									submitButton.click().then(function(){
	        										//console.log('hii testing complete');
	        									})
	        								});
	    									
	    								});
	    							});
	    							
	    						});
	    					})
	    				});
	    			});
	    		});
	    	});
    });
  };
};
module.exports = new NewProjectPage();
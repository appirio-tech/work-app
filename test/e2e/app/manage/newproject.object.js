var NewProjectPage = function() {
	
	this.actionItem = element(by.css('.heading button'));
//	this.actionItem = element(by.uiSref('submit-work.flow'));
	
	console.log('actionItem  '+ this.actionItem);
	
	this.get = function() {
		browser.get('https://www.topcoder-dev.com/work/#/manage');
	}
	
 
	this.createNewProject = function() {
	console.log('click action itemy');
	
    var EC = protractor.ExpectedConditions;
    
    this.actionItem.click().then(function(){
    	console.log('click action item');
    	var workName = element(by.model('vm.work.name'));
    	console.log('label item'+workName);
    	var workNameText = workName.getText();
    	console.log('workNameText '+workNameText);
    	workName.clear();
    	workName.sendKeys('Test 1234 - new');
    	var submitButton = element(by.css('.submit'));
    	submitButton.click().then(function(){
    		var projectTypeDesign = element(by.id('project-type-design'));
    		projectTypeDesign.click().then(function(){
    			submitButton = element(by.css('.submit'));
    			submitButton.click().then(function(){
    				var yesUpload = element(by.css('.yes'));
    				yesUpload.click().then(function(){
    					submitButton.click().then(function(){
    						submitButton = element(by.css('.submit'));
    						submitButton.click().then(function(){
    							var description = element(by.model('vm.work.usageDescription'));
    							description.clear();
    							description.sendKeys('abcd');
    							submitButton = element(by.css('.submit'));
    							submitButton.click().then(function(){
    								var featureLogin = element(by.id('feature-login'));
    								featureLogin.click();
    								submitButton = element(by.css('.submit'));
    								submitButton.click().then(function(){
    									submitButton = element(by.css('.submit'));
    									submitButton.click().then(function(){
    										var submitWork = element(by.id('submit-work-accept-terms'));
    										submitWork.click();
        									submitButton = element(by.css('.launch'));
        									submitButton.click().then(function(){
        										console.log('hii testing complete');
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
  
//  this.editProject = function () {
//	  var workLabel = element(by.model('vm.work.name'));
//	  var EC = protractor.ExpectedConditions;
//	  console.log('label item '+workLabel);
//	  browser.driver.wait(protractor.until.elementIsNotVisible(workLabel));
//	  browser.wait(EC.not(EC.presenceOf(workLabel)), 10000);
//	  
//	  workLabel.sendKeys('new name is given');
//	
//  };
  
};
module.exports = new NewProjectPage();
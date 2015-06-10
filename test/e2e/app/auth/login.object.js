var LoginPage = function() {
  this.userInput = element(by.model('vm.username'));
  this.passwordInput = element(by.model('vm.password'));
  this.loginButton = element(by.css('.submit'));
 
  this.get = function() {
    browser.get('https://www.topcoder-dev.com/work/#/login');
  };
 
  this.login = function(loginUser) {
    this.userInput.sendKeys(loginUser.username);
    this.passwordInput.sendKeys(loginUser.password);
    var EC = protractor.ExpectedConditions;
    
    this.loginButton.click().then(function(){
//    browser.driver.sleep(1);
//browser.waitForAngular();`
    	element.all(by.css('.label')).each(function(element, index) {
    	browser.wait(EC.not(EC.presenceOf(element)), 10000);
 	 // Will print 0 First, 1 Second, 2 Third.
 		element.getText().then(function (text) {
 			console.log(index, text);
 		});
    });
    	
    	
//    	var loggedInUser = element(by.css('div[ng-show=\"vm.isLoggedIn\"]'));
//    	alert(loggedInUser);
//    	browser.driver.sleep(1);
//    	browser.driver.wait(function() {
//    	    return browser.driver.isElementPresent(by.css('[ng-show=\"vm.isLoggedIn\"]'));
//    	});
//    	var loggedInUser = element(by.css('.label'));
//    	alert(loggedInUser);
    	
//    	loggedInUser.click().then(function(){
//    		browser.driver.sleep(3);
//    		console.log('logout');
//    		var elementSref = element(by.uisref('register'));
//    		
//    		expect(elementSref.isPresent()).toBeTruthy();
//    		elementSref.click();
//    		browser.driver.sleep(3);
//    		
////        	browser.wait(10000);
////        	expect(element(by.model('vm.username')).getText()).
////            toEqual('');
//    	});
    	
//    	element(by.css('[ng-show="vm.isLoggedIn"]')).click().then(function(){
//    		browser.driver.sleep(3);
//        	browser.wait(10000);
//        	expect(element(by.model('vm.username')).getText()).
//            toEqual('');
//    	});
    	
    	
    	
    	
	});
  };
  
  this.newProject = function () {
	var elementLabel = element.all(by.css('.label'));
	console.log('elementLabel '+elementLabel);
	
//	browser.pause();
	elementLabel.get(2).click().then(function(){
//		browser.driver.sleep(3);
		var EC = protractor.ExpectedConditions;
		console.log('elementLabel '+elementLabel);
		var label = element(by.css('.label'));
		browser.driver.wait(protractor.until.elementIsNotVisible(label));
		browser.wait(EC.not(EC.presenceOf(label)), 10000);
	});
	
		
		//this.submitWorkFlow.click();
  };
  
};
module.exports = new LoginPage();
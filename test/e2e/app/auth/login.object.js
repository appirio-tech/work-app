var LoginPage = function() {
  this.userInput = element(by.model('vm.username'));
  this.passwordInput = element(by.model('vm.password'));
  this.loginButton = element(by.css('.submit'));
 
  this.get = function(baseUrl) {
    browser.get(baseUrl);
  };
 
  this.login = function(loginUser) {
	  
	expect(browser.getTitle()).toContain('Appiro Work Platform:');
//	console.log('title '+browser.getTitle());
	
    this.userInput.sendKeys(loginUser.username);
    this.passwordInput.sendKeys(loginUser.password);
    var EC = protractor.ExpectedConditions;
    
    this.loginButton.click().then(function(){
//    	browser.waitForAngular();
    	
    	element.all(by.css('.label')).each(function(element, index) {
    		
    		var isClickable = EC.elementToBeClickable(element);
    		browser.wait(isClickable, 10000);
//    	browser.wait(EC.not(EC.presenceOf(element)), 10000);
 	 // Will print 0 First, 1 Second, 2 Third.
 		element.getText().then(function (text) {
 			console.log(index, text);
 		});
    });
   });
  };
  
  this.logOut = function () {
	  var EC = protractor.ExpectedConditions;
	var elementLabel = element.all(by.css('.label'));
	var isClickable = EC.elementToBeClickable(elementLabel.get(2));
	browser.wait(isClickable, 10000);
//	console.log('elementLabel '+elementLabel);
	
	elementLabel.get(2).click().then(function() {
		
//		console.log('elementLabel '+elementLabel);
		var label = element(by.css('.label'));
		var isClickable = EC.elementToBeClickable(label);
		browser.wait(isClickable, 20000);
		
//		browser.driver.wait(protractor.until.elementIsNotVisible(label));
//		browser.wait(EC.not(EC.presenceOf(label)), 10000);
	});
  };
  
};
module.exports = new LoginPage();
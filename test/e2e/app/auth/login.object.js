var LoginPage = function() {
  this.userInput = element(by.model('vm.username'));
  this.passwordInput = element(by.model('vm.password'));
  this.loginButton = element(by.css('.submit'));
 
  this.get = function(baseUrl) {
    browser.get(baseUrl);
  };
 
  this.login = function(loginUser) {
	  
	expect(browser.getTitle()).toContain('Appiro Work Platform:');
	
    this.userInput.sendKeys(loginUser.username);
    this.passwordInput.sendKeys(loginUser.password);
    var EC = protractor.ExpectedConditions;
    
    this.loginButton.click().then(function(){
    	
    	element.all(by.css('.label')).each(function(element, index) {
    		
    	var isClickable = EC.elementToBeClickable(element);
    	browser.wait(isClickable, 10000);
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
	
	elementLabel.get(2).click().then(function() {
		
		var label = element(by.css('.label'));
		var isClickable = EC.elementToBeClickable(label);
		browser.wait(isClickable, 20000);
		
	});
  };
  
};
module.exports = new LoginPage();
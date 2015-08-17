var LoginPage = function() {
 
  this.get = function(baseUrl) {
    browser.get(baseUrl);
  };
 
  this.login = function(loginUser) {
	  
	  var EC = protractor.ExpectedConditions;
	
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
	  
  	
  	
	  var passwordInput = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
    	 
	  var loginButton = element(by.css('.submit'));
	  isClickable = EC.elementToBeClickable(loginButton);
	  browser.wait(isClickable, 30000);
	  console.log('userInput');
   
    
    
	  loginButton.click().then(function() {
    	
    	element.all(by.css('.label')).each(function(element, index) {
    		
    	isClickable = EC.elementToBeClickable(element);
    	browser.wait(isClickable, 30000);
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
	var isClickable = EC.elementToBeClickable(elementLabel.get(1));
	browser.wait(isClickable, 10000);
	
	elementLabel.get(2).click().then(function() {
		
		var label = element(by.css('.label'));
		var isClickable = EC.elementToBeClickable(label);
		browser.wait(isClickable, 20000);
		
	});
  };
  
};
module.exports = new LoginPage();
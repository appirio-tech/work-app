var LoginPage = function() {
  this.userInput = element(by.model('vm.username'));
  this.passwordInput = element(by.model('vm.password'));
  this.loginButton = element(by.css('.submit'));
 
  this.get = function(loginUser) {
    browser.get(loginUser.baseUrl);
  };
 
  this.login = function(loginUser) {
    this.userInput.sendKeys(loginUser.username);
    this.passwordInput.sendKeys(loginUser.password);
    var EC = protractor.ExpectedConditions;
    
    this.loginButton.click().then(function(){
    	element.all(by.css('.label')).each(function(element, index) {
    	browser.wait(EC.not(EC.presenceOf(element)), 10000);
 	 // Will print 0 First, 1 Second, 2 Third.
 		element.getText().then(function (text) {
 			console.log(index, text);
 		});
    });
   });
  };
  
  this.newProject = function () {
	var elementLabel = element.all(by.css('.label'));
	console.log('elementLabel '+elementLabel);
	
	elementLabel.get(2).click().then(function(){
		var EC = protractor.ExpectedConditions;
		console.log('elementLabel '+elementLabel);
		var label = element(by.css('.label'));
		browser.driver.wait(protractor.until.elementIsNotVisible(label));
		browser.wait(EC.not(EC.presenceOf(label)), 10000);
	});
  };
  
};
module.exports = new LoginPage();
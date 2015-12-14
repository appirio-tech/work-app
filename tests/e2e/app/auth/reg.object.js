var RegistrationPage = function() {
  
  
 
  this.get = function(baseUrl) {
    browser.get(baseUrl);
  };
 
  this.register = function(regUser) {
	  var userInput = element(by.model('vm.username'));
	  var passwordInput = element(by.model('vm.password'));
	  var userEmail = element(by.model('vm.email'));
	  var registerButton = element(by.css('.submit'));  
	  
	  var EC = protractor.ExpectedConditions;
	  
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 20000);
	  userInput.sendKeys(regUser.username);
    
	  var isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 20000);
	  passwordInput.sendKeys(regUser.password);
    
	  var isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 20000);
	  userEmail.sendKeys(regUser.email);
    
	  var isClickable = EC.elementToBeClickable(registerButton);
	  browser.wait(isClickable, 20000);
    
    
	  registerButton.click().then(function(){
		  element.all(by.css('.label')).each(function(element, index) {
			  var isClickable = EC.elementToBeClickable(element);
			  browser.wait(isClickable, 10000);
			  element.getText().then(function (text) {
				  console.log(index, text);
			  });
      });   	   	
	});
  };

};
module.exports = new RegistrationPage();
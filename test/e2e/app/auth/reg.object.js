var RegistrationPage = function() {
  
  this.userInput = element(by.model('vm.username'));
  this.passwordInput = element(by.model('vm.password'));
  this.userEmail = element(by.model('vm.email'));
  this.registerButton = element(by.css('.submit'));
 
  this.get = function() {
    browser.get('http://www.topcoder-dev.com/work/#/register');
  };
 
  this.register = function(regUser) {
    this.userInput.sendKeys(regUser.username);
    this.passwordInput.sendKeys(regUser.password);
    this.userEmail.sendKeys(regUser.email);
    var EC = protractor.ExpectedConditions;
    
    this.registerButton.click().then(function(){
      element.all(by.css('.label')).each(function(element, index) {
        browser.wait(EC.not(EC.presenceOf(element)), 10000);
 		    element.getText().then(function (text) {
 			    console.log(index, text);
 		    });
      });   	   	
	  });
  };

};
module.exports = new RegistrationPage();
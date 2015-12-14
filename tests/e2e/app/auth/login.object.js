var LoginPage = function() {
 
  this.get = function(baseUrl) {
	  console.log('baseUrl '+baseUrl);
    browser.get(baseUrl);
  };
 
  this.login = function(loginUser) {
	  browser.ignoreSynchronization = true;
	  
	  var EC = protractor.ExpectedConditions;
	
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 90000);
	  userInput.sendKeys(loginUser.username);
  	
  	
	  var passwordInput = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 90000);
	  passwordInput.sendKeys(loginUser.password);
    	 
	  var loginButton = element(by.css('.action'));
	  isClickable = EC.elementToBeClickable(loginButton);
	  browser.wait(isClickable, 90000);
	  console.log('userInput');
   
    
	  loginButton.click().then(function() {
    	
    	var yourProjectText = element(by.partialLinkText('START A NEW PROJECT'));
    	isClickable = EC.elementToBeClickable(yourProjectText);
   	  	browser.wait(isClickable, 90000);
   });
  };
  
  this.logOut = function () {
	  browser.ignoreSynchronization = true;  
	  
	  var EC = protractor.ExpectedConditions;
	  
	  var profileLogout = element(by.css('.profile button'));
	  profileLogout.click().then(function(){
		  
		  var profileLogoutBtn = element(by.css('.profile .drop-down ul'));
		  browser.actions().mouseMove(profileLogoutBtn).perform();
		  var logoutBtn = profileLogoutBtn.all(by.css('li')).get(2);
		  logoutBtn.click().then(function(){
			  var userInput = element(by.model('vm.username'));
			  var isClickable = EC.elementToBeClickable(userInput);
			  browser.wait(isClickable, 30000);
		  });
	  });
  };
  
};
module.exports = new LoginPage();
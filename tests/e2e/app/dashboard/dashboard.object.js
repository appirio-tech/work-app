var DashboardPage = function() {
	var self = this;
	
	this.get = function(baseUrl) {
		browser.get(baseUrl);
	};

	
	this.createNewProject = function(project, errMsg) {
		browser.driver.ignoreSynchronization = true;
		var EC = protractor.ExpectedConditions;
		browser.driver.sleep(5000);
		
		var actionItem = element(by.css('.layout-main .button'));
		var isClickable = EC.elementToBeClickable(actionItem);
		browser.wait(isClickable, 30000);
		
		actionItem.click().then(function() {
	    	var workName = element(by.model('vm.name'));
	    	var workNameText = workName.getText();
	    	workName.clear();
	    	workName.sendKeys(project.name);
	    	var continueBtn = element(by.css('.continue-buttons button'));
	    	var isClickable = EC.elementToBeClickable(continueBtn);
			browser.wait(isClickable, 20000);
			continueBtn.click().then(function() {
	    		browser.driver.sleep(1500);
	    		element.all(by.repeater('device in vm.devices')).filter(function(elem, index){
	    			var selectedDevice = false;
	    			return elem.all(by.css('checkbox')).get(0).getAttribute('label').then(function(checkboxValue){
	    				for(var j = 0; j < project.deviceTypes.length; j++) {
	    					if(checkboxValue.toLowerCase() == project.deviceTypes[j].toLowerCase()) {
	    						selectedDevice = true;
	    						break;
	    					}
	    				}
	    				return selectedDevice;
	    			});
//	    			var checkboxDevice = elem.all(by.css('checkbox')).get(0);
//	    			self.getDeviceTypeSelection(checkboxDevice, index, project.deviceTypes);
	    		}).each(function(filteredElement, subIndex){
	    			self.getDeviceTypeSelection(filteredElement, project.deviceTypes);
	    		});
	    	}).then(function(){
	    		var avail = false;
	    		for(var cnt = 0; cnt < project.deviceTypes.length; cnt++){
	    			console.log('cnt --'+project.deviceTypes[cnt]);
	    			if(project.deviceTypes[cnt].toLowerCase() == 'iphone' || project.deviceTypes[cnt].toLowerCase() == 'ipad'){
	    				avail = true;
	    				break;
	    			}
	    		}
	    		if(avail){
	    			 var isAvail = self.getOrientationType(project.orientations);
	    			 if(isAvail == false){
	    				 return false;
	    			 }
	    		}
	    	}).then(function(returnValue) {
	    		if(returnValue == false) {
	    			var errorElem = element(by.id('platform-details')).all(by.css('.error')).get(1);
	    			expect(errorElem.isDisplayed()).toEqual(true);
	    			expect(errorElem.getText()).toEqual(errMsg.orientationErrMsg);
	    			return false;
	    		}
	    			
	    	    continueBtn = element.all(by.css('.continue-buttons button')).get(1);
	    		continueBtn.click().then(function() {
	    			if(project.deviceTypes.length == 0) {
	    				var deviceError = element(by.id('platform-details')).all(by.css('.error')).get(0);
	    				expect(deviceError.getText()).toEqual(errMsg.deviceErrMsg);
	    				expect(deviceError.isDisplayed()).toEqual(true);
	    				return false;
	    			}
	    			else {
	    				element.all(by.repeater('projectType in vm.projectTypes')).filter(function(projectTypeCont, index){
	    					isClickable = EC.elementToBeClickable(projectTypeCont);
		    				browser.wait(isClickable, 20000);
		    				var projectTypeHeader = projectTypeCont.all(by.css('.ng-binding')).get(0);
		    				return projectTypeHeader.getText().then(function(text){
		    					if(text == project.type) {
		    						var projectType = projectTypeCont.all(by.model('vm.projectType')).get(0);
		    						return true;
		    					}
		    					return false;
		    				});
		    				}).then(function(filteredElements){
		    					console.log('here iam --'+filteredElements.length);
		    					if(filteredElements.length > 0){
		    						filteredElements[0].all(by.model('vm.projectType')).get(0).click();
		    					}
		    				});
	    			}
	    		}).then(function(returnValue){
	    			if(returnValue == false) {
	    				return false;
	    			} 
	    			
	    			var continueBtn = element.all(by.css('.continue-buttons button')).get(2);
	    			continueBtn.click().then(function(){ 
	    				if(project.type == ''){
		    				var typeError = element(by.id('type-details')).all(by.css('.error')).get(0);
							isClickable = EC.elementToBeClickable(typeError);
		    				browser.wait(isClickable, 20000);
							browser.driver.sleep(1500);
							
							expect(typeError.isDisplayed()).toEqual(true);
							expect(typeError.getText()).toEqual(errMsg.typeErrMsg);
							return false;
		    			}
	    				
	    				var brief = element(by.model('vm.brief'));
	    	    		brief.sendKeys(project.brief);
	    	    		var createProject = element(by.id('brief-details')).all(by.css('.continue-buttons .action')).get(0);
	    	    		createProject.click().then(function(){
	    	    			if(project.brief == ''){
	    	    				var noBriefErr = element(by.id('brief-details')).all(by.css('.error')).get(0);
	    	    				isClickable = EC.elementToBeClickable(noBriefErr);
			    				browser.wait(isClickable, 20000);
	    	    				expect(noBriefErr.isDisplayed()).toBeTruthy();
	    	    				expect(noBriefErr.getText()).toEqual(errMsg.briefErrMsg);
	    	    			} else {
	    	    				var choices = element(by.css('.selectable-choices'));
		    	    			var featureSelect = choices.all(by.css('li .action')).get(0);
		    	    			isClickable = EC.elementToBeClickable(featureSelect);
			    				browser.wait(isClickable, 20000);
	    	    			}
	    	    			
	    	    		});
	    			});
	    		});
	    	});
		});
		
  };
  
  
  
  
  
  
  
  
  
  
  
};
module.exports = new DashboardPage();
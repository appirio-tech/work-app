var MessagingPage = function() {
	
	this.createNewProject = function(projectName) {
		browser.ignoreSynchronization = true;
		var actionItemButton = element(by.css('.manage button'));
		console.log('this.actionItem '+actionItemButton);
		var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(actionItemButton);
		browser.wait(isClickable, 20000);
		
		actionItemButton.click().then(function(){
	    	console.log('click action item');
	    	var workName = element(by.model('vm.work.name'));
	    	console.log('label item'+workName);
	    	var workNameText = workName.getText();
	    	console.log('workNameText '+workNameText);
	    	workName.clear();
	    	workName.sendKeys(projectName);
	    	
	    	var estimateLink = element(by.id('submit-work-nav')).all(by.css('ul .estimate')).first();
	    	var isClickable = EC.elementToBeClickable(estimateLink);
			browser.wait(isClickable, 20000);
	    	
	    	estimateLink.click().then(function() {
	    		console.log('submit work');
	    		var submitWork = element(by.id('submit-work-accept-terms'));
	    		var isClickable = EC.elementToBeClickable(submitWork);
				browser.wait(isClickable, 20000);
				submitWork.click();
				submitButton = element(by.css('.launch'));
				var isClickable = EC.elementToBeClickable(submitButton);
		    	browser.wait(isClickable, 20000);
				submitButton.click().then(function(){
					//console.log('hii testing complete');
				})
	    	});
		});
	};

	
	this.messageByTimeLinePage = function(project) {
		browser.ignoreSynchronization = true; 
		var actionItemList = element.all(by.partialLinkText('Awaiting estimate'));
		var actionItemCount = actionItemList.count();
		console.log('total item'+actionItemCount);
//		expect(actionItemCount).toEqual(9);
		actionItemCount = actionItemCount - 1;
		var actionItem = actionItemList.last();
		console.log('actionItem  '+ actionItem.getText());
		var EC = protractor.ExpectedConditions;
//		var isClickable = EC.elementToBeClickable(actionItem);
//    	browser.wait(isClickable, 20000);
    
    	actionItem.click().then(function() {
    	console.log('edit project now');
    	var messagingButton = element(by.css('.project-nav')).all(by.partialLinkText('Messaging')).first();
    	var isClickable = EC.elementToBeClickable(messagingButton);
    	browser.wait(isClickable, 30000);
    	messagingButton.click().then(function() {
    		var newMessageTextBox = element(by.model('vm.newMessage'));
    		var isClickable = EC.elementToBeClickable(newMessageTextBox);
        	browser.wait(isClickable, 30000);
        	newMessageTextBox.clear();
        	newMessageTextBox.sendKeys(project.customerMessage);
        	var enterButton = element(by.css('.enter'));
        	enterButton.click().then(function(){
        		messagingButton = element(by.css('.project-nav')).all(by.partialLinkText('Messaging')).first();
        		isClickable = EC.elementToBeClickable(messagingButton);
            	browser.wait(isClickable, 30000);
        	});
    	});
    });
  };
  
  
  
  this.messageInMyProjects = function(project, openProjectsUrl) {
	  	browser.ignoreSynchronization = true; 
		var liElements = element(by.css('.secondary ul')).all(by.partialLinkText('Copilot'));
		var openProjectLink = liElements.get(0);
		var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(openProjectLink);
		browser.wait(isClickable, 30000);
		browser.get(openProjectsUrl);
//		openProjectLink.click().then(function() {
			var openProjectTab = element.all(by.css('.projectsHeading div button')).get(1);
			isClickable = EC.elementToBeClickable(openProjectTab);
			browser.wait(isClickable, 30000);
//			openProjectTab.click().then(function(){
				var copilotHeader = element(by.css('h1'));
				var isClickable = EC.elementToBeClickable(copilotHeader);
				browser.wait(isClickable, 30000);
				var projectList = element.all(by.repeater('project in filteredWorkRequests'));
				
				var selectedProject = projectList.get(project.projectNumber - 1);
				var viewDetailButtons = element.all(by.partialButtonText('View Details'));
				var selectedButton = viewDetailButtons.get(project.projectNumber - 1);

				browser.actions().mouseMove(selectedProject).perform();
				
				selectedButton.click().then(function(){
					var exitButton = element(by.css('.exit'));
					exitButton.click().then(function(){
						var messageClientBtn = element(by.partialButtonText('Message Client'));
						messageClientBtn.click().then(function(){
							var newMessageTextBox = element(by.model('vm.newMessage'));
							var isClickable = EC.elementToBeClickable(newMessageTextBox);
				        	browser.wait(isClickable, 30000);
				        	newMessageTextBox.clear();
				        	newMessageTextBox.sendKeys(project.copilotMessage);
							var enterBtn = element(by.css('.enter'));
							enterBtn.click().then(function(){
								newMessageTextBox = element(by.model('vm.newMessage'));
				        		isClickable = EC.elementToBeClickable(newMessageTextBox);
				            	browser.wait(isClickable, 30000);
							});
						});
					});
					
					
					
					/*
					var claimProject = element(by.partialButtonText('Claim Project'));
					var isClickable = EC.elementToBeClickable(claimProject);
					browser.wait(isClickable, 30000);
					
					claimProject.click().then(function(){
						var createEstimates = element(by.css('.detailsContainer')).all(by.partialButtonText('Create Estimates')).first();
						var isClickable = EC.elementToBeClickable(createEstimates);
						browser.wait(isClickable, 30000);
						createEstimates.click().then(function(){
							var type = element(by.css('.challengesContainer .dropdown-container .type'));
							var isClickable = EC.elementToBeClickable(type);
							browser.wait(isClickable, 30000);
							
//							var repeaterType = element(by.repeater('type in vm.challengeTypes').row(1));
							type.click();
							element(by.cssContainingText('li', project.projectType)).click();
//							repeaterType.click();
							
							var count = element(by.css('.challengesContainer .dropdown-container')).all(by.css('.count')).first();
							var isClickable = EC.elementToBeClickable(count);
							browser.wait(isClickable, 30000);
							
//							var repeaterCount = element(by.repeater('number in vm.challengeCounts').row(1));
							count.click();
//							repeaterCount.click();
							element(by.cssContainingText('li', project.projectCount)).click();
							
							
							var difficulty = element(by.css('.dropdown .dropdown-container .difficulty'));//.all(by.css('.difficulty')).first();
							var isClickable = EC.elementToBeClickable(difficulty);
							browser.wait(isClickable, 30000);
							
//							var difficultyRepeater = element(by.repeater('difficulty in vm.challengeDifficulties').row(1));
							difficulty.click();
//							difficultyRepeater.click();
							element(by.cssContainingText('li', project.projectDifficulty)).click();
							
							var difficultyExplanation = element(by.model('vm.difficultyExplanation'));
							var isClickable = EC.elementToBeClickable(difficultyExplanation);
							browser.wait(isClickable, 30000);
							
							difficultyExplanation.sendKeys(project.projectDifficultyExplanation);
							var submitEstimates = element(by.css('.submitEstimates'));
							var isClickable = EC.elementToBeClickable(submitEstimates);
							browser.wait(isClickable, 30000);
							
							submitEstimates.click().then(function(){
								console.log('estimate submitted');
								expect(true).toEqual(true);
							});
							
						});
					});*/
				});
//			});
			
//		});
		
		
	};
	
	this.clickMessageNotification = function(project) {
		var msgNotifications = element(by.css('.message-notifications'));
		msgNotifications.click().then(function(){
			var liList = element(by.css('.popup threads ul')).all(by.css('li'));
			var linkElementList = liList.all(by.css('a'));
			linkElementList.get(0).click().then(function(){
				var msgField = element(by.model('vm.newMessage'));
				var EC = protractor.ExpectedConditions;
				var isClickable = EC.elementToBeClickable(msgField);
				browser.wait(isClickable, 30000);
				
				msgField.sendKeys(project.customerMessage);
				var enterBtn = element(by.css('.enter'));
				enterBtn.click().then(function() {
					msgField = element(by.model('vm.newMessage'));
	        		isClickable = EC.elementToBeClickable(msgField);
	            	browser.wait(isClickable, 30000);
				});
			});
		});
	};
  
  
  
  
  
  
  
  
};
module.exports = new MessagingPage();
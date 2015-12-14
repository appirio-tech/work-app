var ProjectsClaimPage = function() {
	
	this.get = function(baseUrl) {
		browser.get(baseUrl);
	};

	this.claimAnyOpenProject = function(project, openProjectsUrl){
		browser.ignoreSynchronization = true;
		console.log('claimOpenProject'+openProjectsUrl);
		var EC = protractor.ExpectedConditions;
		
		var manageProjects = element(by.partialButtonText('New Project'));
		var isClickable = EC.elementToBeClickable(manageProjects);
		browser.wait(isClickable, 30000);
		
		
		var liElements = element(by.css('.secondary ul')).all(by.partialLinkText('Copilot'));
		var openProjectLink = liElements.get(0);
		
		isClickable = EC.elementToBeClickable(openProjectLink);
		browser.wait(isClickable, 30000);
		browser.get(openProjectsUrl);
//		openProjectLink.click().then(function() {
//			var openProjectTab = element.all(by.css('.projectsHeading div button')).get(1);
//			isClickable = EC.elementToBeClickable(openProjectTab);
//			browser.wait(isClickable, 30000);
//			openProjectTab.click().then(function(){
//				browser.driver.sleep(1);
				browser.refresh(30000);
				browser.waitForAngular();
				//browser.driver.implicitlyWait(30000);
				var copilotHeader = element(by.css('.projects'));
			    isClickable = EC.elementToBeClickable(copilotHeader);
				browser.wait(isClickable, 30000);
				var projectList = element.all(by.repeater('project in filteredWorkRequests'));
				
				var selectedProject = projectList.get(project.projectNumber - 1);
				var viewDetailButtons = element.all(by.partialButtonText('View Details'));
				var selectedButton = viewDetailButtons.get(project.projectNumber - 1);

				browser.actions().mouseMove(selectedProject).perform();
				
				selectedButton.click().then(function(){
					var claimProject = element(by.partialButtonText('Claim Project'));
				    isClickable = EC.elementToBeClickable(claimProject);
					browser.wait(isClickable, 30000);
					
					claimProject.click().then(function(){
						var statusModal = element(by.css('.statusModal'));
					    isClickable = EC.elementToBeClickable(statusModal);
						browser.wait(isClickable, 30000);
						browser.wait(function () {
						    return statusModal.isDisplayed();
						  },30000);
						expect(statusModal.isDisplayed()).toEqual(true);
						
						var createEstimates = element (by.css('.statusModal .modalButton'));
						isClickable = EC.elementToBeClickable(createEstimates);
						browser.wait(isClickable, 30000);
						expect(createEstimates.isDisplayed()).toEqual(true);
						console.log('just before create estimates');
						createEstimates.click().then(function(){
							console.log('in create estimates');
							var type = element(by.css('.challengesContainer .dropdown-container .type'));
							var isClickable = EC.elementToBeClickable(type);
							browser.wait(isClickable, 30000);
							
//							var repeaterType = element(by.repeater('type in vm.challengeTypes').row(1));
							type.click();
							element(by.cssContainingText('li', project.projectType)).click();
//							repeaterType.click();
							
							var count = element(by.css('.challengesContainer .dropdown-container')).all(by.css('.count')).first();
						    isClickable = EC.elementToBeClickable(count);
							browser.wait(isClickable, 30000);
							
//							var repeaterCount = element(by.repeater('number in vm.challengeCounts').row(1));
							count.click();
//							repeaterCount.click();
							element(by.cssContainingText('li', project.projectCount)).click();
							
							var addButton = element(by.css('.addButton'));
						    isClickable = EC.elementToBeClickable(addButton);
							browser.wait(isClickable, 30000);
							addButton.click();
							
							
							var difficulty = element(by.css('.dropdown .dropdown-container .difficulty'));//.all(by.css('.difficulty')).first();
							isClickable = EC.elementToBeClickable(difficulty);
							browser.wait(isClickable, 30000);
							
//							var difficultyRepeater = element(by.repeater('difficulty in vm.challengeDifficulties').row(1));
							difficulty.click();
//							difficultyRepeater.click();
							element(by.cssContainingText('li', project.projectDifficulty)).click();
							
							var difficultyExplanation = element(by.model('vm.difficultyExplanation'));
							isClickable = EC.elementToBeClickable(difficultyExplanation);
							browser.wait(isClickable, 30000);
							
							difficultyExplanation.sendKeys(project.projectDifficultyExplanation);
							var submitEstimates = element(by.css('.submitEstimates'));
							isClickable = EC.elementToBeClickable(submitEstimates);
							browser.wait(isClickable, 30000);
							
							submitEstimates.click().then(function(){
								console.log('estimate submitted');
								expect(true).toEqual(true);
							});
							
						});
					});
				});
//			});
			
//		});
	};
	/*
	this.estimateAnyClaimedProject = function(project){
		browser.ignoreSynchronization = true;
		
		var liElements = element(by.css('.secondary header-nav ul')).all(by.partialLinkText('Copilot'));
		var openProjectLink = liElements.get(0);
		var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(openProjectLink);
		browser.wait(isClickable, 30000);
		openProjectLink.click().then(function() {
			var openProjectTab = element.all(by.css('.projectsHeading div button')).get(0);
			isClickable = EC.elementToBeClickable(openProjectTab);
			browser.wait(isClickable, 30000);
			openProjectTab.click().then(function() {
				var copilotHeader = element(by.css('h1'));
				var isClickable = EC.elementToBeClickable(copilotHeader);
				browser.wait(isClickable, 30000);
				var projectList = element.all(by.repeater('project in filteredWorkRequests'));
				
//				element.all(by.css('.tile .created')).all('.created');
				element.all(by.css('.tile')).filter(function(elem, index) {
					elem
					  return elem.getText().then(function(text) {
					    return text === 'Claimed';
					  });
					}).then(function(filteredElements) {
					  filteredElements[0].click();
				});
				
				
				var selectedProject = projectList.get(project.projectNumber - 1);
				var viewDetailButtons = element.all(by.partialButtonText('View Details'));
				var selectedButton = viewDetailButtons.get(project.projectNumber - 1);

				browser.actions().mouseMove(selectedProject).perform();
				
				selectedButton.click().then(function(){
					var claimProject = element(by.partialButtonText('Claim Project'));
					var isClickable = EC.elementToBeClickable(claimProject);
					browser.wait(isClickable, 30000);
					
					claimProject.click().then(function(){
						var statusModal = element(by.css('.statusModal'));
						var isClickable = EC.elementToBeClickable(statusModal);
						browser.wait(isClickable, 30000);
						browser.wait(function () {
						    return statusModal.isDisplayed();
						  },30000);
						expect(statusModal.isDisplayed()).toEqual(true);
						
						var createEstimates = statusModal.all(by.css('.modalButton')).first();
						isClickable = EC.elementToBeClickable(createEstimates);
						browser.wait(isClickable, 30000);
						expect(createEstimates.isDisplayed()).toEqual(true);
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
					});
				});
			});
			
		});
	
		
	};*/
	
	
	
	
	
};
module.exports = new ProjectsClaimPage();
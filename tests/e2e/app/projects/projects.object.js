var ProjectListPage = function() {
	
	
	this.get = function(baseUrl) {
		browser.get(baseUrl);
	};

	this.viewOpenProjectList = function(project){
		var liElements = element(by.css('.secondary header-nav ul')).all(by.css('li'));
		var openProjectLink = liElements.get(4);
		var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(openProjectLink);
		browser.wait(isClickable, 30000);
		openProjectLink.click().then(function() {
				var copilotHeader = element(by.css('h1'));
				var isClickable = EC.elementToBeClickable(copilotHeader);
				browser.wait(isClickable, 30000);
				var projectList = element.all(by.repeater('project in filteredWorkRequests'));
				
				var firstProject = projectList.get(project.projectNumber - 1);
				var viewDetailButtons = element.all(by.partialButtonText('Estimates Required'));
				
				var firstButton = viewDetailButtons.get(project.projectNumber - 1);
				browser.actions().mouseMove(firstProject).perform();
				
				firstButton.click().then(function(){
						console.log('Claim Project On click');
						//claimProject
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
				});
			
			});
		
		
		};
	
	
	
	
	
};
module.exports = new ProjectListPage();
var ProjectDetailsPage = function() {
	var self = this;
	
	this.get = function(baseUrl) {
		browser.get(baseUrl);
	};

	
	this.goToSpecificProjecetDetails = function(project) {
		browser.driver.ignoreSynchronization = true;
		var EC = protractor.ExpectedConditions;
		browser.driver.sleep(5000);
		
		var actionItem = element(by.css('.projects .clean'));
		var isClickable = EC.elementToBeClickable(actionItem);
		browser.wait(isClickable, 30000);
		
		actionItem.click().then(function(){
			var projectList = element.all(by.repeater('project in vm.projects'));
			projectList.filter(function(elem, index){
				var projectLink = elem.all(by.css('a')).get(0);
				return projectLink.getText().then(function(text){
					return text == project.name;
				});
			}).then(function(filterProjects){
				filterProjects[0].click().then(function(){
					var liElem = element.all(by.css('layout-project-nav li')).get(3);
					liElem.click().then(function(){
						browser.driver.sleep(10000);
						var projectDetailsSetup = element(by.id('project-details-setup'));
						expect(projectDetailsSetup.isDisplayed()).toEqual(true);
					});
				});
			});
		});
	};
  
  
  this.validateData = function(project) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var deviceLi = element.all(by.repeater('device in vm.project.deviceIds'));
	  deviceLi.filter(function(elem, index){
		  var deviceLabel = elem.all(by.css('label')).get(0);
		  var found = false;
		  return deviceLabel.getText().then(function(text){
			  for(var i=0; i < project.deviceTypes.length; i++){
				  console.log('device Types'+project.deviceTypes[i]);
				  console.log('text '+text);
				  if(project.deviceTypes[i].toLowerCase() == text.toLowerCase()) {
					  found = true;
					  break;
				  }
			  }
			  return found;
		  });
	  }).then(function(filteredElements){
		  expect(filteredElements.length).toEqual(project.deviceTypes.length);
		  var projectType = element(by.css('.project-type'));
		  var projectTypeText = projectType.all(by.css('p')).get(0);
		  projectTypeText.getText().then(function(text){
			  expect(project.type.toLowerCase()).toEqual(text.toLowerCase());
			  var orientations = element.all(by.repeater('orientation in vm.project.orientationIds'));
			 
			  orientations.filter(function(elem, index){
				  var found = false;
				  return elem.all(by.css('label')).get(0).getText().then(function(text){
					  for(var i = 0; i< project.orientations.length; i++){
						  if(project.orientations[i].toLowerCase() == text.toLowerCase()){
							  found = true;
							  break;
						  }
					  }
					  return found;
				  });
			  }).then(function(filteredElements){
				  console.log('filteredElements '+filteredElements.length);
				  expect(filteredElements.length).toEqual(project.orientations.length);
				  var filesCont = element(by.css('.files'));
				  expect(filesCont.isDisplayed()).toEqual(true);
				  var features = filesCont.all(by.repeater('file in vm.project.files.features'));
				  features.filter(function(elem, index){
					  return features.all(by.css('a')).get(0).getText().then(function(text){
						  var found = false;
						  for(var i = 0; i < project.uploadFeatures.length; i++) {
							  var uploadFeatureName = project.uploadFeatures[i];
							  var fileName = uploadFeatureName.substring(uploadFeatureName.lastIndexOf('/') + 1);
							  if(fileName == text) {
								  found =  true;
								  break;
							  }
						  }
						  return found;
					  });
				  }).then(function(filteredFeatures){
					  console.log('filtered features ---'+filteredFeatures.length);
					  expect(filteredFeatures.length).toEqual(project.uploadFeatures.length);
					  var featureDescriptions = element(by.css('.features-descriptions'));
					  expect(featureDescriptions.isDisplayed()).toEqual(true);
					  var featureList = element.all(by.repeater('feature in vm.project.features'));
					  featureList.filter(function(elem,index){
						  console.log('elem --'+elem+' --index'+index);
						  var found1 = false;
						  var labelElem = elem.all(by.css('label')).get(0);
						  var notesElem = elem.all(by.css('.notes p')).get(0);
						  return labelElem.getText().then(function(text){
							  console.log('text ---'+text);
							  return notesElem.getText().then(function(notes){
								  console.log('notes ---'+notes);
								  for(var i=0; i < project.featureList.length; i++) {
									  for(var j=0; j < project.featureList[i].subCategories.length; j++){
										  console.log('pr notes index [i] :'+i+ '[j] : '+j);
										  console.log('pr notes'+project.featureList[i].subCategories[j].notes);
										  if(text == project.featureList[i].subCategories[j].name){
											  console.log('pr notes text-'+project.featureList[i].subCategories[j].notes);
											  if(notes == project.featureList[i].subCategories[j].notes){
												  console.log('pr notes pp'+notes);
												  found1 = true;
												  break;
											  }
										  }
									  }
								  }
								  return found1;
							  });

//							for(var i = 0; i < project.featureList.length; i++) {
//								for(var j = 0; j < project.featureList[i].subCategories.length; j++) {
//									console.log('project name '+project.featureList[i].subCategories[j].name);
//									if(text == project.featureList[i].subCategories[j].name){
//										foun
////										notesElem.getText().then(function(notes){
////											console.log('notes --'+notes);
////											console.log('pr notes index [i] :'+i+ '[j] : '+j);
////											console.log('pr notes'+project.featureList[i].subCategories[j].notes);
////											if(notes == project.featureList[i].subCategories[j].notes){
////												found1 = true;
////												break;
////											}
////										});
//									}
//								}
//							}
							return found1;
						  });
					  }).then(function(filteredFeatureList){
						  console.log('filteredFeatureList.length'+filteredFeatureList.length);
						  expect(filteredFeatureList.length).toEqual(project.featureList.length);
					  });
				  });
			  });
		  });
	  });
  };
  
  this.validateDesignData = function(project){
	  var projectFiles = element.all(by.repeater('file in vm.project.files.visuals'));
	  projectFiles.filter(function(elem, index){
		return  elem.all(by.css('a')).get(0).getText().then(function(text){
			var found = false;
			for(var i = 0; i < project.uploadDesignDocs.length; i++){
				console.log('text '+text);
				console.log('project.uploadDesignDocs[i]'+project.uploadDesignDocs[i]);
				
				if(project.uploadDesignDocs[i] == text){
					found = true;
					break;
				}
			} 
			return found;
		 });
	  }).then(function(filteredElements){
		  expect(filteredElements.length).toEqual(project.uploadDesignDocs.length);
		  var projectDetailDesign = element(by.id('project-details-design'));
		  var styleLink = projectDetailDesign.all(by.css('main a')).get(filteredElements.length);
		  styleLink.getText().then(function(text){
			  expect(text).toEqual(project.styleUrl);
			  projectDetailDesign.all(by.css('.flex label')).get(0).getText().then(function(text){
				  expect(project.design.font).toEqual(text);
				  var colorList = element.all(by.repeater('color in vm.project.colorSwatchIds'));
				  colorList.each(function(elem, index){
					 var imgSrc = elem.all(by.css('img')).get(0);
					 imgSrc.getAttribute('src').then(function(srcText){
						console.log('src text ---'+srcText);
						for(var i=0; i< project.design.colors.length; i++){
							if(project.design.colors[i] == 'GREEN'){
								break;
							} 
						} 
					 });
				  });
			  }).then(function(){
				  var iconRep = element.all(by.repeater('icon in vm.project.iconsetIds'));
				  iconRep.each(function(elem, index){
					  elem.all(by.css('label')).get(0).getText().then(function(text){
						 expect(project.design.icon).toEqual(text); 
					  });
				  });
			  });
		  });
	  });
  };
  
};
module.exports = new ProjectDetailsPage();
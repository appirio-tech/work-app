var NewProjectPage = function() {
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
	//			    				projectType.click();
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
  
  
  this.allWorkTypeProject = function(project, errMsg) {
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
	    			element.all(by.repeater('projectType in vm.projectTypes')).each(function(projectTypeCont, index){
	    				isClickable = EC.elementToBeClickable(projectTypeCont);
	    				browser.wait(isClickable, 20000);
	    				projectTypeCont.all(by.model('vm.projectType')).get(0).click();
	    			}).then(function(){
		    			var firstElem = element.all(by.repeater('projectType in vm.projectTypes')).get(0);
		   				firstElem.all(by.css('button')).get(0).getAttribute('class').then(function(classNames){
							if(classNames.indexOf('checked') != -1){
			    				expected(true).toEqual(false);
			    			}
		    			}).then(function(returnValue){
		    				if(returnValue != false){
		    					var lastSelected = element.all(by.repeater('projectType in vm.projectTypes')).last();
			    				lastSelected.all(by.model('vm.projectType')).first().click();
			    				expect(true).toEqual(true);
		    				}
		    			 });
		    			});
	    		});
	    	});
		});
		
  };
  
  
  this.getDeviceTypeSelection = function(firstCheckboxDevice, deviceTypes){
	  var selectedDevice  = false;
		  var firstCheckboxBtn = firstCheckboxDevice.all(by.css('button')).get(0);
			firstCheckboxDevice.getAttribute('label').then(function(firstCheckboxValue){
//				for(var j = 0; j < deviceTypes.length; j++) {
//					if(firstCheckboxValue == deviceTypes[j].name) {
//						selectedDevice = true;
//					}
//				}
				
//				if(selectedDevice == true) {
					if(firstCheckboxValue == 'iWatch'){
						firstCheckboxBtn.click();
					} else {
						firstCheckboxBtn.click();/*.then(function(){
//							index = index - 1;
							element.all(by.repeater('orientation in vm.orientations')).filter(function(orElem, indexCount){
								return orElem.all(by.css('checkbox')).get(0).then(function(elem){
									elem.getAttribute('label').then(function(orientationCheckboxValue){
//										console.log('orientationCheckboxValue'+orientationCheckboxValue);
											for(var k = 0; k < orientations.length; k++){
												if(orientationCheckboxValue == orientations[k]){
													//elem.click();
													return true;
												}
											}
											return false;
										});
								});
							}).then(function(filteredElems){
								console.log('filteredElems length' +filteredElems.length);
								if(filteredElems.length == 0) {
									
								}
								for(var cnt = 0; cnt < filteredElems.length; cnt++){
									var checkElem = filteredElems[cnt].all(by.css('checkbox')).get(0);
									checkElem.all(by.css('button')).get(0).getAttribute().then(function(classNames){
										if(classNames.indexOf('checked') == -1) {
											checkElem.click();
										}
									});
								}
							});
							
						});*/
					}
					
//					selectedDevice = false;
//				} 
			});
	  
  };
  
  
  this.getOrientationType = function(orientations) {
	  var orientationAvail = false;
	  var alreadySelected = element.all(by.repeater('orientation in vm.orientations')).get(1);
	  alreadySelected.all(by.css('button')).get(0).click();
	  if(orientations.length == 0 ){
		  return false;
	  } else {
	  element.all(by.repeater('orientation in vm.orientations')).filter(function(orElem, indexCount){
		   return orElem.all(by.css('checkbox')).get(0).getAttribute('label').then(function(orientationCheckboxValue){
				  for(var k = 0; k < orientations.length; k++){
					  if(orientationCheckboxValue.toLowerCase() == orientations[k].toLowerCase()){
						  return true;
					  }
				  }
				  return false;
			});
		}).each(function(filteredElem, index){
			orientationAvail = true;
			var checkElem = filteredElem.all(by.css('checkbox')).get(0);
			checkElem.all(by.css('button')).get(0).getAttribute('class').then(function(classNames){
				if(classNames.indexOf('checked') == -1) {
					checkElem.click();
				}
			});
		}).then(function(){
			return true;
		});
	  
	  }
  }
  
  
  this.finishRequirements = function(project, featureList){
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  browser.driver.sleep(2000);
	  
	  var projectList = element.all(by.repeater('project in vm.projects track by $index'));
	  projectList.count().then(function(totalProjects){
		  var targetedProject = projectList.get(totalProjects - 1);
		  var projectCont = targetedProject.all(by.css('.elevated-bottom')).get(0);
		  var projectNameCont = projectCont.all(by.css('.project-name .ng-binding')).get(0);
		  projectNameCont.getText().then(function(projectName){
			  if(projectName == project.name.toUpperCase()) {
				  var projectTypeCont = projectCont.all(by.css('.project-name .type')).get(0);
				  projectTypeCont.getText().then(function(projectType){
					  if(project.type == 'DESIGN') {
						  var projectTypeText = project.type + ' - Setup Incomplete';  
					  } else {
						  var projectTypeText = 'Design/Code - Setup Incomplete';  
					  }
					
					expect(projectType).toEqual(projectTypeText);
					var projectStatusCont = projectCont.all(by.css('card-main label')).get(0);
					projectStatusCont.getText().then(function(status){
						expect('REQUIREMENTS INCOMPLETE').toEqual(status);
						var projectFinishLink = projectCont.all(by.css('card-main a')).get(0);
						projectFinishLink.click().then(function(){
							var choices = element(by.css('.selectable-choices'));
	    	    			var featureSelect = choices.all(by.css('li .action')).get(0);
	    	    			isClickable = EC.elementToBeClickable(featureSelect);
		    				browser.wait(isClickable, 20000);
		    				choices.all(by.css('h4')).get(0).getText().then(function(text){
		    					console.log('text ---'+text);
		    					expect('DEFINE FEATURES').toEqual(text);
		    				}).then(function(){
		    					featureSelect.click().then(function(){
//		    						browser.pause();
		    						browser.driver.sleep(1500);
		    						var featureHeader = element(by.css('.define-features h2 strong'));
		    						expect(featureHeader.getText()).toEqual('FEATURES');
		    						element.all(by.repeater('featureCategory in vm.categoriesList')).each(function(mainCategory, index){
		    							console.log('mainCategoryList'+mainCategory+ ' index'+index);
		    							var mainFeature = mainCategory.all(by.css('feature-list .ng-binding')).get(0);
		    							expect(mainFeature.getText()).toEqual(featureList[index].mainCategory);
//		    							console.log('featureList[index].mainCategory'+featureList[index].mainCategory);
		    							mainFeature.getText().then(function(mainFeatureText){
		    								console.log('mainFeatureText '+mainFeatureText);
//			    							var subCategories = mainFeature.all(by.repeater('feature in vm.features'));
		    								mainCategory.all(by.repeater('feature in vm.features')).each(function(subCategory, subIndex){
		    									browser.driver.sleep(1500);
		    									isClickable = EC.elementToBeClickable(subCategory);
		    									browser.wait(isClickable, 20000);
		    									var subCategoryHeader = subCategory.all(by.css('.flex p')).get(0);
//		    									isClickable = EC.elementToBeClickable(subCategoryHeader);
//		    									browser.wait(isClickable, 20000);
		    									expect(subCategoryHeader.waitReady()).toBeTruthy();
		    									subCategoryHeader.getText().then(function(subCategoryText){
			    									console.log('subCategoryText'+subCategoryText);
			    									expect(subCategoryText).toEqual(featureList[index].subCategories[subIndex]);
			    									for(var k = 0; k < project.featureList.length; k++) {
//			    										console.log('project.featureList[k].mainCategory '+project.featureList[k].mainCategory);
//			    										console.log('mainFeatureText '+mainFeatureText);
			    										if(project.featureList[k].mainCategory == mainFeatureText) {
			    											console.log('project.featureList[k].mainCategory'+project.featureList[k].mainCategory);
			    											for(var j = 0; j < project.featureList[k].subCategories.length; j++) {
			    												var projectSubCategory = project.featureList[k].subCategories[j];
			    												console.log('projectSubCategory.notes'+projectSubCategory.notes);
			    												if(projectSubCategory.name == subCategoryText) {
			    													console.log('subCategoryText'+subCategoryText);
			    													var subCategoryButton = subCategory.all(by.css('button')).get(0);
			    													browser.driver.sleep(1500);
			    													subCategoryButton.click().then(function(){
			    														browser.driver.sleep(1500);
			    														var description = element(by.css('.contents .description'));
			    														isClickable = EC.elementToBeClickable(description);
			    									    				browser.wait(isClickable, 30000);
			    														expect(description.all(by.css('h5')).get(0).getText()).toEqual(subCategoryText.toUpperCase());
			    														var notes = description.all(by.model('vm.activeFeature.notes')).get(0);
			    														isClickable = EC.elementToBeClickable(notes);
			    									    				browser.wait(isClickable, 30000);
			    														notes.sendKeys(projectSubCategory.notes);
			    														console.log('projectSubCategory.notes--'+projectSubCategory.notes);
			    														var addFeatureBtn = description.all(by.css('.action')).get(0);
			    														addFeatureBtn.click();
//			    														browser.pause();
			    													});
			    												}
			    											}
			    										}
			    									}
			    								});
			    							});
		    							});
		    						});
		    					});
		    				});
		    				
						});
					});
				  });
			  } else {
				  expect(project.name.toUpperCase()).toEqual(projectName);
			  }
		  });
	  });
  };
  
  
  
  
  this.finishRequirementsNew = function(project, featureList){
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  browser.driver.sleep(2000);
	  
	  var projectList = element.all(by.repeater('project in vm.projects track by $index'));
	  projectList.count().then(function(totalProjects){
		  var targetedProject = projectList.get(totalProjects - 1);
		  var projectCont = targetedProject.all(by.css('.elevated-bottom')).get(0);
		  var projectNameCont = projectCont.all(by.css('.project-name .ng-binding')).get(0);
		  projectNameCont.getText().then(function(projectName){
			  if(projectName == project.name.toUpperCase()) {
				  var projectTypeCont = projectCont.all(by.css('.project-name .type')).get(0);
				  projectTypeCont.getText().then(function(projectType){
					  if(project.type == 'DESIGN') {
						  var projectTypeText = project.type + ' - Setup Incomplete';  
					  } else {
						  var projectTypeText = 'Design/Code - Setup Incomplete';  
					  }  
					expect(projectType).toEqual(projectTypeText);
					var projectStatusCont = projectCont.all(by.css('card-main label')).get(0);
					projectStatusCont.getText().then(function(status){
						expect('REQUIREMENTS INCOMPLETE').toEqual(status);
						var projectFinishLink = projectCont.all(by.css('card-main a')).get(0);
						projectFinishLink.click().then(function(){
							var choices = element(by.css('.selectable-choices'));
	    	    			var featureSelect = choices.all(by.css('li .action')).get(0);
	    	    			isClickable = EC.elementToBeClickable(featureSelect);
		    				browser.wait(isClickable, 20000);
		    				choices.all(by.css('h4')).get(0).getText().then(function(text){
		    					console.log('text ---'+text);
		    					expect('DEFINE FEATURES').toEqual(text);
		    				}).then(function(){
		    					featureSelect.click().then(function(){
//		    						browser.pause();
		    						browser.driver.sleep(1500);
		    						var featureHeader = element(by.css('.define-features h2 strong'));
		    						expect(featureHeader.getText()).toEqual('FEATURES');
//		    						for(var k = 0; k < project.featureList.length; k++) { 
		    							element.all(by.repeater('featureCategory in vm.categoriesList')).filter(function(mainCategory, index){
//		    									var mainCategory = element.all(by.repeater('featureCategory in vm.categoriesList')).get(index);
//			    								var mainFeature = mainCategory.all(by.css('feature-list .ng-binding')).get(0);
			    								console.log('-index-'+index);
			    								return mainCategory.all(by.css('feature-list .ng-binding')).get(0).getText().then(function(mainFeatureText){ 
			    									console.log('-index-uu'+index);
			    									console.log('-mainFeatureText-'+mainFeatureText);
			    									var isAvail = false;
			    									for(var k = 0; k < project.featureList.length; k++) { 
				    									if(mainFeatureText == project.featureList[k].mainCategory) {
				    										console.log('---mainFeatureText ---'+mainFeatureText);
				    										isAvail = true;
				    									}
			    									}
			    									return isAvail;
			    								});
		    							}).then(function(filteredElements){
		    								console.log('hi-'+filteredElements.length);
//		    								console.log('hii'+filteredElements.count());
//		    								expect(filteredElements.count()).toEqual(1);
//		    								filteredElements.each(function(filterElement, filterIndex){
		    								for(var m = 0; m < filteredElements.length; m++) {
		    									filteredElements[m].all(by.repeater('feature in vm.features')).filter(function(subCategory, subIndex){
		    									browser.driver.sleep(1500);
		    									isClickable = EC.elementToBeClickable(subCategory);
		    									browser.wait(isClickable, 20000);
		    									var subCategoryHeader = subCategory.all(by.css('.flex p')).get(0);
//		    									isClickable = EC.elementToBeClickable(subCategoryHeader);
//		    									browser.wait(isClickable, 20000);
		    									expect(subCategoryHeader.waitReady()).toBeTruthy();
		    									return subCategoryHeader.getText().then(function(subCategoryText){
			    									console.log('subCategoryText'+subCategoryText);
			    									var isSubAvail = false;
//			    									expect(subCategoryText).toEqual(featureList[index].subCategories[subIndex]);
			    									for(var k = 0; k < project.featureList.length; k++) {
//			    										console.log('project.featureList[k].mainCategory '+project.featureList[k].mainCategory);
//			    										console.log('mainFeatureText '+mainFeatureText);
//			    										if(project.featureList[k].mainCategory == mainFeatureText) {
			    											console.log('project.featureList[k].mainCategory'+project.featureList[k].mainCategory);
			    											for(var j = 0; j < project.featureList[k].subCategories.length; j++) {
			    												var projectSubCategory = project.featureList[k].subCategories[j];
			    												console.log('projectSubCategory.notes'+projectSubCategory.notes);
			    												if(projectSubCategory.name == subCategoryText) {
			    													console.log('subCategoryText'+subCategoryText);
			    													isSubAvail = true;
			    												}
			    											}
//			    										}
			    									}
			    									return isSubAvail;
			    								});
			    							}).then(function(filteredSubElements){
			    								console.log('filteredSubElements '+ filteredSubElements.length);
			    								for(var subCnt =0; subCnt < filteredSubElements.length; subCnt++) {
			    									browser.driver.sleep(5000);
				    								var subCategoryButton = filteredSubElements[subCnt].all(by.css('button')).get(0);
				    								var subCategoryHeader = filteredSubElements[subCnt].all(by.css('.flex p')).get(0);
//													browser.driver.sleep(1500);
				    								subCategoryHeader.getText().then(function(text){
				    									console.log('text -----oo'+text);
													subCategoryButton.click().then(function(){
														browser.driver.sleep(1500);
														var description = element(by.css('.contents .description'));
														isClickable = EC.elementToBeClickable(description);
									    				browser.wait(isClickable, 30000);
									    				expect(description.waitReady()).toEqual(true);
									    				expect(description.all(by.css('h5')).get(0).getText()).toEqual(text.toUpperCase());
									    				
													}).then(function(){
														var projectNotes = '';
									    					for(var k = 0; k < project.featureList.length; k++) {
									    						for(var j = 0; j < project.featureList[k].subCategories.length; j++) {
				    												var projectSubCategory = project.featureList[k].subCategories[j];
				    												console.log('projectSubCategory.notes--'+projectSubCategory.notes);
				    												if(projectSubCategory.name == text) {
				    													console.log('subCategoryText--'+text);
				    													projectNotes = projectSubCategory.notes;
				    												}
				    											}
									    					}
									    				}).then(function(){
															var notes = description.all(by.model('vm.activeFeature.notes')).get(0);
															isClickable = EC.elementToBeClickable(notes);
										    				browser.wait(isClickable, 30000);
															notes.sendKeys(projectNotes);
															console.log('projectSubCategory.notes--'+projectNotes);
															var addFeatureBtn = description.all(by.css('.action')).get(0);
															addFeatureBtn.click();
															browser.pause();
									    				});
//														
													});
			    							}
			    							});
		    							}
		    								
		    							});
		    							
//		    						}
//		    						element.all(by.repeater('featureCategory in vm.categoriesList')).count().then(function(mainCategoryCount){
//		    							for(var startCounter = 0; startCounter < mainCategoryCount;){
//		    								var mainCategory = element.all(by.repeater('featureCategory in vm.categoriesList')).get(startCounter);
//		    								var mainFeature = mainCategory.all(by.css('feature-list .ng-binding')).get(0);
//		    								expect(mainFeature.getText()).toEqual(featureList[startCounter].mainCategory);
////		    								console.log('startCounter  '+startCounter);
//		    								mainFeature.getText().then(function(mainFeatureText){ 
//		    									console.log('mainFeatureText '+mainFeatureText);
//		    									var subCategoriesCont = mainCategory.all(by.repeater('feature in vm.features'));
//		    									expect(subCategoriesCont.count()).toEqual(featureList[startCounter].subCategories.length);
//		    									subCategoriesCont.count().then(function(subCount){
//		    										console.log('startCounter  '+startCounter);
//		    										console.log('subCount '+subCount);
//		    										for(var subStart = 0; subStart < subCount; subStart++){
//		    											var subCategory = mainCategory.all(by.repeater('feature in vm.features')).get(subStart);
//		    											var subCategoryHeader = subCategory.all(by.css('.flex p')).get(0);
//		    											expect(subCategoryHeader.waitReady()).toBeTruthy();
//		    											subCategoryHeader.getText().then(function(subCategoryText){ 
//		    												console.log('subCategoryText --'+subCategoryText);
//		    												console.log('featureList[startCounter].subCategories[subStart]'+startCounter+'--'+featureList[startCounter]);
//		    												expect(subCategoryText).toEqual(featureList[startCounter].subCategories[subStart]);
//		    												for(var k = 0; k < project.featureList.length; k++) {
////					    										console.log('project.featureList[k].mainCategory '+project.featureList[k].mainCategory);
////					    										console.log('mainFeatureText '+mainFeatureText);
//					    										if(project.featureList[k].mainCategory == mainFeatureText) {
//					    											console.log('project.featureList[k].mainCategory'+project.featureList[k].mainCategory);
//					    											for(var j = 0; j < project.featureList[k].subCategories.length; j++) {
//					    												var projectSubCategory = project.featureList[k].subCategories[j];
//					    												console.log('projectSubCategory.notes'+projectSubCategory.notes);
//					    												if(projectSubCategory.name == subCategoryText) {
//					    													console.log('subCategoryText'+subCategoryText);
//					    													var subCategoryButton = subCategory.all(by.css('button')).get(0);
//					    													browser.driver.sleep(1500);
//					    													subCategoryButton.click().then(function(){
//					    														browser.driver.sleep(1500);
//					    														var description = element(by.css('.contents .description'));
//					    														isClickable = EC.elementToBeClickable(description);
//					    									    				browser.wait(isClickable, 30000);
//					    														expect(description.all(by.css('h5')).get(0).getText()).toEqual(subCategoryText.toUpperCase());
//					    														var notes = description.all(by.model('vm.activeFeature.notes')).get(0);
//					    														isClickable = EC.elementToBeClickable(notes);
//					    									    				browser.wait(isClickable, 30000);
//					    														notes.sendKeys(projectSubCategory.notes);
//					    														console.log('projectSubCategory.notes--'+projectSubCategory.notes);
//					    														var addFeatureBtn = description.all(by.css('.action')).get(0);
//					    														addFeatureBtn.click();
////					    														browser.pause();
//					    													});
//					    												}
//					    											}
//					    										}
//					    									}
//		    											});
//		    										}
//		    										
//		    									});
//		    									
//		    								});
//		    								startCounter++;
//		    								
//		    							}
//		    						});
//		    						element.all(by.repeater('featureCategory in vm.categoriesList')).each(function(mainCategory, index){
//		    							console.log('mainCategoryList'+mainCategory+ ' index'+index);
//		    							var mainFeature = mainCategory.all(by.css('feature-list .ng-binding')).get(0);
//		    							expect(mainFeature.getText()).toEqual(featureList[index].mainCategory);
////		    							console.log('featureList[index].mainCategory'+featureList[index].mainCategory);
//		    							mainFeature.getText().then(function(mainFeatureText){
//		    								console.log('mainFeatureText '+mainFeatureText);
////			    							var subCategories = mainFeature.all(by.repeater('feature in vm.features'));
//		    								mainCategory.all(by.repeater('feature in vm.features')).each(function(subCategory, subIndex){
//		    									browser.driver.sleep(1500);
//		    									isClickable = EC.elementToBeClickable(subCategory);
//		    									browser.wait(isClickable, 20000);
//		    									var subCategoryHeader = subCategory.all(by.css('.flex p')).get(0);
////		    									isClickable = EC.elementToBeClickable(subCategoryHeader);
////		    									browser.wait(isClickable, 20000);
//		    									expect(subCategoryHeader.waitReady()).toBeTruthy();
//		    									subCategoryHeader.getText().then(function(subCategoryText){
//			    									console.log('subCategoryText'+subCategoryText);
//			    									expect(subCategoryText).toEqual(featureList[index].subCategories[subIndex]);
//			    									for(var k = 0; k < project.featureList.length; k++) {
////			    										console.log('project.featureList[k].mainCategory '+project.featureList[k].mainCategory);
////			    										console.log('mainFeatureText '+mainFeatureText);
//			    										if(project.featureList[k].mainCategory == mainFeatureText) {
//			    											console.log('project.featureList[k].mainCategory'+project.featureList[k].mainCategory);
//			    											for(var j = 0; j < project.featureList[k].subCategories.length; j++) {
//			    												var projectSubCategory = project.featureList[k].subCategories[j];
//			    												console.log('projectSubCategory.notes'+projectSubCategory.notes);
//			    												if(projectSubCategory.name == subCategoryText) {
//			    													console.log('subCategoryText'+subCategoryText);
//			    													var subCategoryButton = subCategory.all(by.css('button')).get(0);
//			    													browser.driver.sleep(1500);
//			    													subCategoryButton.click().then(function(){
//			    														browser.driver.sleep(1500);
//			    														var description = element(by.css('.contents .description'));
//			    														isClickable = EC.elementToBeClickable(description);
//			    									    				browser.wait(isClickable, 30000);
//			    														expect(description.all(by.css('h5')).get(0).getText()).toEqual(subCategoryText.toUpperCase());
//			    														var notes = description.all(by.model('vm.activeFeature.notes')).get(0);
//			    														isClickable = EC.elementToBeClickable(notes);
//			    									    				browser.wait(isClickable, 30000);
//			    														notes.sendKeys(projectSubCategory.notes);
//			    														console.log('projectSubCategory.notes--'+projectSubCategory.notes);
//			    														var addFeatureBtn = description.all(by.css('.action')).get(0);
//			    														addFeatureBtn.click();
////			    														browser.pause();
//			    													});
//			    												}
//			    											}
//			    										}
//			    									}
//			    								});
//			    							});
//		    							});
//		    						});
		    					});
		    				});
		    				
						});
					});
				  });
			  } else {
				  expect(project.name.toUpperCase()).toEqual(projectName);
			  }
		  });
	  });
  };
  
  
  this.finishRequirementsAgainNew = function(project, featureList){
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  
	  var actionItem = element(by.css('.layout-main .button'));
	  var isClickable = EC.elementToBeClickable(actionItem);
	  browser.wait(isClickable, 30000);
	  
	  browser.driver.sleep(10000);
	  
	  var projectList = element.all(by.repeater('project in vm.projects track by $index'));
	  projectList.count().then(function(totalProjects){
		  var targetedProject = projectList.get(10);
		  var projectCont = targetedProject.all(by.css('.elevated-bottom')).get(0);
		  var projectNameCont = projectCont.all(by.css('.project-name .ng-binding')).get(0);
		  projectNameCont.getText().then(function(projectName){
			  if(projectName == project.name.toUpperCase()) {
				  var projectTypeCont = projectCont.all(by.css('.project-name .type')).get(0);
				  projectTypeCont.getText().then(function(projectType){
					  if(project.type == 'DESIGN') {
						  var projectTypeText = project.type + ' - Setup Incomplete';  
					  } else {
						  var projectTypeText = 'Design/Code - Setup Incomplete';  
					  }
					expect(projectType).toEqual(projectTypeText);
					var projectStatusCont = projectCont.all(by.css('card-main label')).get(0);
					projectStatusCont.getText().then(function(status){
						expect('REQUIREMENTS INCOMPLETE').toEqual(status);
						var projectFinishLink = projectCont.all(by.css('card-main a')).get(0);
						projectFinishLink.click().then(function(){
							var choices = element(by.css('.selectable-choices'));
	    	    			var featureSelect = choices.all(by.css('li .action')).get(0);
	    	    			isClickable = EC.elementToBeClickable(featureSelect);
		    				browser.wait(isClickable, 20000);
		    				choices.all(by.css('h4')).get(0).getText().then(function(text){
		    					expect('DEFINE FEATURES').toEqual(text);
		    				}).then(function(){
		    					featureSelect.click().then(function(){
		    						var featureHeader = element(by.css('.define-features h2 strong'));
		    						expect(featureHeader.getText()).toEqual('FEATURES');
		    						browser.driver.sleep(5000);
		    						var firstFeature = element.all(by.repeater('featureCategory in vm.categoriesList')).get(1);
		    						self.subCategorySelection(firstFeature, project);
		    						browser.driver.sleep(5000);
		    						firstFeature = element.all(by.repeater('featureCategory in vm.categoriesList')).get(0);
		    						self.subCategorySelection(firstFeature, project);
		    						var saveBtn = element(by.css('.space-between .action'));
		    						saveBtn.click().then(function(){
		    							var choices = element(by.css('.selectable-choices'));
		    	    	    			var featureSelect = choices.all(by.css('li .action')).get(0);
		    	    	    			isClickable = EC.elementToBeClickable(featureSelect);
		    		    				browser.wait(isClickable, 20000);
		    		    				choices.all(by.css('h4')).get(0).getText().then(function(text){
		    		    					expect('DEFINE FEATURES').toEqual(text);
		    		    				}).then(function(){
		    		    					browser.driver.sleep(5000);
		    						 choices = element(by.css('.selectable-choices'));
		    						 featureSelect = choices.all(by.css('li .action')).get(1);
		    							isClickable = EC.elementToBeClickable(featureSelect);
		    							browser.wait(isClickable, 20000);
		    							
		    							choices.all(by.css('h4')).get(1).getText().then(function(text){
		    		    					expect('UPLOAD REQUIREMENTS').toEqual(text);
		    		    				});
		    							
		    							featureSelect.click().then(function(){
		    								var chooseFiles = element(by.css('.choose-files'));
		    								isClickable = EC.elementToBeClickable(chooseFiles);
			    							browser.wait(isClickable, 30000);
		    								var chooseFilesPath = '';
		    								for(var i = 0; i < project.uploadFiles.length; i++){
		    									chooseFilesPath = chooseFilesPath + project.uploadFiles[i];
		    									if(i < project.uploadFiles.length - 1) {
		    										chooseFilesPath = chooseFilesPath + '\n';
		    									}
		    								}
		    								chooseFiles.sendKeys(chooseFilesPath);
		    								browser.driver.sleep(5000);
		    								element.all(by.repeater('file in files')).count().then(function(count){
		    									expect(count).toEqual(project.uploadFiles.length);
		    								});
		    							});
		    		    				});
		    		    				
		    						});
		    						
		    					});
		    					});
		    				});
		    				
						});
					});
			  }else {
				  expect(project.name.toUpperCase()).toEqual(projectName);
			  }
				  });
		  });
  };
  
  this.goToDesign = function(project, design){

	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  
	  var actionItem = element(by.css('.layout-main .button'));
	  var isClickable = EC.elementToBeClickable(actionItem);
	  browser.wait(isClickable, 30000);
	  
	  browser.driver.sleep(10000);
	  
	  var projectList = element.all(by.repeater('project in vm.projects track by $index'));
	  projectList.count().then(function(totalProjects){
		  var targetedProject = projectList.get(4);
		  var projectCont = targetedProject.all(by.css('.elevated-bottom')).get(0);
		  var projectNameCont = projectCont.all(by.css('.project-name .ng-binding')).get(0);
		  projectNameCont.getText().then(function(projectName){
			  if(projectName == project.name.toUpperCase()) {
				  var projectTypeCont = projectCont.all(by.css('.project-name .type')).get(0);
				  projectTypeCont.getText().then(function(projectType){
					  if(project.type == 'DESIGN') {
						  var projectTypeText = project.type + ' - Setup Incomplete';  
					  } else {
						  var projectTypeText = 'Design/Code - Setup Incomplete';  
					  } 
					expect(projectType).toEqual(projectTypeText);
					var projectStatusCont = projectCont.all(by.css('card-main label')).get(0);
					projectStatusCont.getText().then(function(status){
						expect('REQUIREMENTS INCOMPLETE').toEqual(status);
						var projectFinishLink = projectCont.all(by.css('card-main a')).get(0);
						projectFinishLink.click().then(function(){
							browser.driver.sleep(10000);
							var goToDesignLink = element(by.css('.continue-buttons a'));
						    isClickable = EC.elementToBeClickable(goToDesignLink);
							browser.wait(isClickable, 30000);
							goToDesignLink.click().then(function(){
								var choices = element(by.css('.selectable-choices'));
    	    	    			var featureSelect = choices.all(by.css('li .action')).get(0);
    	    	    			isClickable = EC.elementToBeClickable(featureSelect);
    	    	    			browser.wait(isClickable, 30000);
    	    	    			choices.all(by.css('h4')).get(0).getText().then(function(text){
    		    					expect('DEFINE MY DESIGNS').toEqual(text);
    		    					featureSelect.click().then(function(){
    		    						var mainFonts = element(by.css('.fonts'));
    		    						isClickable = EC.elementToBeClickable(mainFonts);
    									browser.wait(isClickable, 30000);
    		    						expect(mainFonts.waitReady()).toBeTruthy();
    		    						var orChoices = element(by.css('.or-choices'));
    		    						var serifElem = orChoices.all(by.css('.serif')).get(0);
    		    						expect(serifElem.isDisplayed()).toEqual(true);
    		    						var sansSerifElem = orChoices.all(by.css('.sans-serif')).get(0);
    		    						expect(sansSerifElem.isDisplayed()).toEqual(true);
    		    						if(project.design.font == 'SERIF'){
    		    							var serifBtn = serifElem.all(by.css('button')).get(0);
    		    							var serifBtnDiv = serifBtn.all(by.css('div')).get(0);
    		    							serifBtnDiv.isDisplayed().then(function(display){
    		    								if(display){
    		    									serifBtn.click();
    		    								}
    		    							});
    		    						} else {
    		    							var sansSerif = sansSerifElem.all(by.css('button')).get(0);
    		    							var sansSerifDiv = sansSerif.all(by.css('div')).get(0);
    		    							sansSerifDiv.isDisplayed().then(function(display){
    		    								if(display){
    		    									sansSerif.click();
    		    								}
    		    							});
    		    						}
    		    						
    		    						var nextBtn = element(by.css('footer .action'));
    		    						nextBtn.click();
    		    						
    		    						
//        								browser.driver.sleep(10000);
        							}).then(function(){
        								var colorRep = element(by.css('.colors'));
        								isClickable = EC.elementToBeClickable(colorRep);
        								browser.wait(isClickable, 30000);
        								var selectedIndex = 0;
        								
        								element.all(by.repeater('color in vm.colors')).filter(function(color, index){
        									var availColor = false;
        									return color.all(by.css('h6')).get(0).getText().then(function(text){
        										for(var i=0; i<project.design.colors.length;i++){
        											if(text == project.design.colors[i]){
        												console.log('text'+text);
        												availColor = true;
        											}
        										}
        										return availColor;
        									});
        								}).each(function(color){
        								var colorBtn = color.all(by.css('.action')).get(0);
        								var selectDiv = colorBtn.all(by.css('div')).get(0);
        								selectDiv.isDisplayed().then(function(display){
        									if(display){
        										colorBtn.click();
        									}
        								});
        								}).then(function(){
        								browser.driver.sleep(5000);
        								var nextBtn = element.all(by.css('footer button')).get(1);
        								selectedIndex = 0;
        								nextBtn.click().then(function(){
        									var iconRep = element(by.css('.icons'));
        									isClickable = EC.elementToBeClickable(iconRep);
            								browser.wait(isClickable, 30000);
        									element.all(by.repeater('icon in vm.icons')).filter(function(icon, index){
        										availIcon = false;
        										return icon.all(by.css('h6')).get(0).getText().then(function(text){
        											if(text == project.design.icon) {
        												console.log('textpp'+text);
        												selectedIndex = index;
        												availIcon = true;
        											}
//        											if(text == design.icons[index]) {
//        												availIcon = true;
//        											}
        											return availIcon;
        										});
        									}).then(function(icons){
        										console.log('ppp');
        									var iconBtn = icons[0].all(by.css('button')).get(0);
        									iconBtn.isDisplayed().then(function(display){
        										if(display){
        											iconBtn.click();
        										}
//        										browser.driver.sleep(10000);
        									});
        									}).then(function(){
	        									nextBtn = element.all(by.css('footer button')).get(2);
	        									nextBtn.click();
        									}).then(function(){
        										var choices = element(by.css('.selectable-choices'));
				    	    	    			var featureSelect = choices.all(by.css('li .action')).get(0);
				    	    	    			isClickable = EC.elementToBeClickable(featureSelect);
				    	    	    			browser.wait(isClickable, 30000);
        									});
        								});
        								});
        							
        							});
    		    				});
							});
						});
//						});
					});
				  });
			  }else {
				  expect(project.name.toUpperCase()).toEqual(projectName);
			  }
				  });
		  });
  
  };
  
  
  
  this.useBrandGuideline = function(project, design){


	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  
	  var actionItem = element(by.css('.layout-main .button'));
	  var isClickable = EC.elementToBeClickable(actionItem);
	  browser.wait(isClickable, 30000);
	  
	  browser.driver.sleep(10000);
	  
	  var projectList = element.all(by.repeater('project in vm.projects track by $index'));
	  projectList.count().then(function(totalProjects){
		  var targetedProject = projectList.get(10);
		  var projectCont = targetedProject.all(by.css('.elevated-bottom')).get(0);
		  var projectNameCont = projectCont.all(by.css('.project-name .ng-binding')).get(0);
		  projectNameCont.getText().then(function(projectName){
			  if(projectName == project.name.toUpperCase()) {
				  var projectTypeCont = projectCont.all(by.css('.project-name .type')).get(0);
				  projectTypeCont.getText().then(function(projectType){
					  if(project.type == 'DESIGN') {
						  var projectTypeText = project.type + ' - Setup Incomplete';  
					  } else {
						  var projectTypeText = 'Design/Code - Setup Incomplete';  
					  }  
					expect(projectType).toEqual(projectTypeText);
					var projectStatusCont = projectCont.all(by.css('card-main label')).get(0);
					projectStatusCont.getText().then(function(status){
						expect('REQUIREMENTS INCOMPLETE').toEqual(status);
						var projectFinishLink = projectCont.all(by.css('card-main a')).get(0);
						projectFinishLink.click().then(function(){
//							browser.driver.sleep(10000);
							var goToDesignLink = element(by.css('.continue-buttons a'));
						    isClickable = EC.elementToBeClickable(goToDesignLink);
							browser.wait(isClickable, 30000);
							goToDesignLink.click().then(function(){
								var choices = element.all(by.css('.selectable-choices')).get(0);
    	    	    			choices.all(by.css('h4')).get(1).getText().then(function(text){
    		    					expect('USE BRAND GUIDELINES').toEqual(text);
    	    	    			}).then(function(){
    	    	    				var featureSelect = choices.all(by.css('li .action')).get(1);
        	    	    			isClickable = EC.elementToBeClickable(featureSelect);
        	    	    			browser.wait(isClickable, 30000);
        	    	    			browser.driver.sleep(5000);
    		    					featureSelect.click().then(function(){
//    		    						var secondaryCont = element(by.id('secondary'));
    		    						choices = element.all(by.css('.selectable-choices')).get(1);
    		    						var choiceHeader = choices.all(by.css('li h4')).get(0);
    		    						choiceHeader.getText().then(function(choiceHeaderText){
    		    							expect('UPLOAD BRAND GUIDELINES').toEqual(choiceHeaderText);
        		    						var brandBtn = choices.all(by.css('li button')).get(0);
        		    						isClickable = EC.elementToBeClickable(brandBtn);
        	    	    	    			browser.wait(isClickable, 30000);
        		    						brandBtn.click().then(function(){
    		    								var chooseFiles = element(by.css('.choose-files'));
    		    								isClickable = EC.elementToBeClickable(chooseFiles);
    			    							browser.wait(isClickable, 30000);
    		    								var chooseFilesPath = '';
    		    								for(var i = 0; i < project.uploadFiles.length; i++){
    		    									chooseFilesPath = chooseFilesPath + project.uploadFiles[i];
    		    									if(i < project.uploadFiles.length - 1) {
    		    										chooseFilesPath = chooseFilesPath + '\n';
    		    									}
    		    								}
    		    								console.log('chooseFilesPath'+chooseFilesPath);
    		    								chooseFiles.sendKeys(chooseFilesPath);
    		    								browser.driver.sleep(10000);
    		    								element.all(by.repeater('file in files')).count().then(function(count){
    		    									expect(count).toEqual(project.uploadFiles.length);
    		    								});
    		    								element(by.css('.upload-documents button')).click();
        		    						});
    		    						});
    		    					});
    	    	    			});	
							});
						});
//						});
					});
				  });
			  }else {
				  expect(project.name.toUpperCase()).toEqual(projectName);
			  }
				  });
		  });
  };
  
  
  this.getStyleFromUrl = function(project){
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  var choices = element.all(by.css('.selectable-choices')).get(1);
	  var choiceHeader = choices.all(by.css('li h4')).get(1);
	  choiceHeader.getText().then(function(choiceHeaderText){
		  expect('GET STYLE FROM URL').toEqual(choiceHeaderText);
			var brandBtn = choices.all(by.css('li button')).get(1);
			isClickable = EC.elementToBeClickable(brandBtn);
			browser.wait(isClickable, 30000);
			brandBtn.click().then(function(){
				var headerElem = element(by.css('.enter-url main h2'));
				var addressInput = element(by.name('addressInput'));
				isClickable = EC.elementToBeClickable(addressInput);
				browser.wait(isClickable, 30000);
				headerElem.getText().then(function(headerText){
					expect(headerText).toEqual('ENTER YOUR BRAND URL');
					addressInput.clear();
					addressInput.sendKeys(project.styleUrl);
					element(by.css('form button')).click().then(function(){
						element(by.css('.enter-url .close')).click();
					});
				});
			});
		}).then(function(){
			if(project.type == 'DESIGN') {
				element(by.id('secondary')).all(by.css('.continue-buttons .kick-off')).get(0).click().then(function(){
					element(by.css('.full main h1')).getText().then(function(text){
						expect(text).toEqual('PROJECT SUBMITTED!');
						element(by.css('.full main .action')).click().then(function(){
							var actionItem = element(by.css('.layout-main .button'));
							var isClickable = EC.elementToBeClickable(actionItem);
							browser.wait(isClickable, 30000);
						});
					});
				});
			} else {
				var goToDevBtn = element(by.id('secondary')).all(by.css('.continue-buttons .button')).get(0);
				goToDevBtn.getText().then(function(text){
					if(text == 'GO TO DEVELOPMENT'){
						goToDevBtn.click().then(function(){
							var submitWorkDev = element(by.css('submit-work-development'));
							var isClickable = EC.elementToBeClickable(submitWorkDev);
							browser.wait(isClickable, 30000);
						});
					}
				})
			}
		});
  };
  
  
  this.defineDevRequirements = function(project, devlop){
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  var submitWorkDev = element(by.css('submit-work-development'));
	  var choices = submitWorkDev.all(by.css('.selectable-choices')).get(0);
	  var isClickable = EC.elementToBeClickable(choices);
	  browser.wait(isClickable, 30000);
	  var choiceHeader = choices.all(by.css('li h4')).get(0);
	  choiceHeader.getText().then(function(choiceHeaderText){
		  expect('DEFINE REQUIREMENTS').toEqual(choiceHeaderText);
		  var brandBtn = choices.all(by.css('li button')).get(0);
		  isClickable = EC.elementToBeClickable(brandBtn);
		  browser.wait(isClickable, 30000);
		  brandBtn.click().then(function(){
			  var offlineMain = element.all(by.css('main')).get(0);
			  isClickable = EC.elementToBeClickable(offlineMain);
			  browser.wait(isClickable, 30000);
			  expect(offlineMain.all(by.css('h2')).get(0).getText()).toEqual('DOES YOUR APPLICATION NEED OFFLINE ACCESS?');
			  var offlineChoices = offlineMain.all(by.css('.or-choices')).get(0);
			  if(project.develop.offlineAccess == 'y'){
				  offlineChoices.all(by.css('li button')).get(0).getAttribute('class').then(function(text){
					 if(text.indexOf('checked') == -1){
						 offlineChoices.all(by.css('li button')).get(0).click();
					 }
				  });
			  } else {
				  offlineChoices.all(by.css('li button')).get(1).getAttribute('class').then(function(text){
						 if(text.indexOf('checked') == -1){
							 offlineChoices.all(by.css('li button')).get(1).click();
						 }
					  });
			  }
					console.log('=--------offline access------------');
			  element(by.css('.nav .active')).getText().then(function(text){
				  expect(text).toEqual('OFFLINE ACCESS');
			  }).then(function(){
				  var backBtn = element(by.css('footer')).all(by.css('button')).get(0);
				  expect(backBtn.isDisplayed()).toEqual(false);
				  var nextBtn = element(by.css('footer')).all(by.css('button')).get(1);
				  expect(nextBtn.isDisplayed()).toEqual(true);
				  var saveBtn = element(by.css('footer')).all(by.css('button')).get(2);
				  expect(saveBtn.isDisplayed()).toEqual(false);
				  nextBtn.click().then(function(){
				  browser.driver.sleep(10000);
				  console.log('=--------personalMain access------------');
				  var personalMain = element.all(by.css('.define-development main')).get(1);
//				  isClickable = EC.elementToBeClickable(personalMain);
//				  browser.wait(isClickable, 30000);
				  expect(personalMain.all(by.css('h2')).get(0).getText()).toEqual('PERSONAL INFORMATION');
				  var personalChoices = personalMain.all(by.css('.or-choices')).get(0);
				  if(project.develop.personalInformation == 'y'){
					  personalChoices.all(by.css('li button')).get(0).getAttribute('class').then(function(text){
						  if(text.indexOf('checked') == -1){
							  personalChoices.all(by.css('li button')).get(0).click();
						  }
					  });
				  } else {
					  personalChoices.all(by.css('li button')).get(1).getAttribute('class').then(function(text){
						  if(text.indexOf('checked') == -1){
							  personalChoices.all(by.css('li button')).get(1).click();
						  }
					  });
				  }
						
//				  element(by.css('.nav .active')).getText().then(function(text){
				  expect(element(by.css('.nav .active')).getText()).toEqual('PERSONAL INFORMATION');
//				  }).then(function(){
				  backBtn = element(by.css('footer')).all(by.css('button')).get(0);
				  expect(backBtn.isDisplayed()).toEqual(true);
				  nextBtn = element(by.css('footer')).all(by.css('button')).get(1);
				  expect(nextBtn.isDisplayed()).toEqual(true);
				  saveBtn = element(by.css('footer')).all(by.css('button')).get(2);
				  expect(saveBtn.isDisplayed()).toEqual(false);
				  nextBtn.click().then(function(){
					  console.log('security level');
//					  browser.driver.sleep(15000);
					  var securityMain = element.all(by.css('.define-development main')).get(2);
					  expect(securityMain.isPresent()).toEqual(true);
					  browser.driver.sleep(30000);
					  expect(securityMain.isDisplayed()).toEqual(true);
//				  expect(securityMain.waitReady()).toBeTruthy();
			  console.log('--security level--');
			  isClickable = EC.elementToBeClickable(securityMain);
			  browser.wait(isClickable, 30000);
			  var securityChoices = securityMain.all(by.css('.selectable-choices')).get(0);
//			  var choices = element(by.css('.define-development .selectable-choices'));
			  securityChoices.all(by.css('li h6')).each(function(securityElem, index){
				  expect(securityElem.getText()).toEqual(develop.securityLevel[index]);
			  });
			  securityChoices.all(by.css('li')).filter(function(securityLi, index){
				  console.log('security text00'+index);
				  return securityLi.all(by.css('h6')).get(0).getText().then(function(text){
					  console.log('security text--'+text);
					  return text == project.develop.securityLevel;
				  });
			  }).then(function(selectedLi){
				  console.log('selectedLi '+selectedLi.length);
				  var selBtn = selectedLi[0].all(by.css('button')).get(0);
				  selBtn.all(by.css('div')).get(0).isDisplayed().then(function(display){
					  if(display){
						  selectedLi[0].all(by.css('button')).get(0).click();
					  }
				  });
			  }).then(function(){
				  element(by.css('.nav .active')).getText().then(function(text){
					  console.log('--text---'+text);
					  expect(text).toEqual('SECURITY LEVEL');
				  }).then(function(){
					  var backBtn = element(by.css('footer')).all(by.css('button')).get(0);
					  expect(backBtn.isDisplayed()).toEqual(true);
					  var nextBtn = element(by.css('footer')).all(by.css('button')).get(1);
					  expect(nextBtn.isDisplayed()).toEqual(true);
					  var saveBtn = element(by.css('footer')).all(by.css('button')).get(2);
					  expect(saveBtn.isDisplayed()).toEqual(false);
					  nextBtn.click().then(function(){
						  console.log('security level ---- nextBtn');
						  browser.driver.sleep(10000);
						  var thirdPartyMain = element.all(by.css('.define-development main')).get(3);
						  isClickable = EC.elementToBeClickable(thirdPartyMain);
						  browser.wait(isClickable, 30000);
						  var thirdPartyChoices = thirdPartyMain.all(by.css('input')).get(0);
						  thirdPartyChoices.clear();
						  thirdPartyChoices.sendKeys(project.develop.thirdPartyCount);
								
						  var backBtn = element(by.css('footer')).all(by.css('button')).get(0);
						  expect(backBtn.isDisplayed()).toEqual(true);
						  var nextBtn = element(by.css('footer')).all(by.css('button')).get(1);
						  expect(nextBtn.isDisplayed()).toEqual(false);
						  var saveBtn = element(by.css('footer')).all(by.css('button')).get(2);
						  expect(saveBtn.isDisplayed()).toEqual(true);
						  saveBtn.click().then(function(){
							  browser.driver.sleep(10000);
							  var submitWorkDev = element(by.css('submit-work-development'));
							  var choices = submitWorkDev.all(by.css('.selectable-choices')).get(0);
							  var isClickable = EC.elementToBeClickable(choices);
							  browser.wait(isClickable, 30000);
							  var kickOffBtn = element(by.css('.continue-buttons')).all(by.css('.kick-off')).get(0);
							  kickOffBtn.click();
						  });
					  });
				  });
			  });
			});
//		  });
		});
	  });
    });
  });
  };
  
  
  
  
  
  
  
  
  
  this.subCategorySelection = function(firstFeature, project){
	  var isAvail = false;
		var k = 0; 
		var EC = protractor.ExpectedConditions;
		firstFeature.all(by.css('feature-list .ng-binding')).get(0).getText().then(function(mainCategoryText){
			for(;k < project.featureList.length;k++){
				if(mainCategoryText == project.featureList[k].mainCategory){
					isAvail =true;
					break;
				}
			}
			if(isAvail == true) {
				var subCategory = firstFeature.all(by.repeater('feature in vm.features')).get(0);
				var subCategoryButton = subCategory.all(by.css('button')).get(0);
				var subCategoryHeader = subCategory.all(by.css('.flex p')).get(0);
				var projectNotes = '';
				expect(subCategoryHeader.waitReady()).toBeTruthy();
				subCategoryHeader.getText().then(function(text){
					for(var k = 0; k < project.featureList.length; k++) {
						for(var j = 0; j < project.featureList[k].subCategories.length; j++) {
							var projectSubCategory = project.featureList[k].subCategories[j];
							console.log('projectSubCategory.notes--'+projectSubCategory.notes);
							if(projectSubCategory.name == text) {
								projectNotes = projectSubCategory.notes;
							}
						}
					}
				subCategoryButton.click().then(function(){
					var description = element(by.css('.contents .description'));
					isClickable = EC.elementToBeClickable(description);
					browser.wait(isClickable, 30000);
					expect(description.waitReady()).toEqual(true);
					expect(description.all(by.css('h5')).get(0).getText()).toEqual(text.toUpperCase());
					var notes = description.all(by.model('vm.activeFeature.notes')).get(0);
					isClickable = EC.elementToBeClickable(notes);
					browser.wait(isClickable, 30000);
					notes.sendKeys(projectNotes);
					var addFeatureBtn = description.all(by.css('.action')).get(0);
					addFeatureBtn.click();
					browser.driver.sleep(5000);
					
				});
				});
			}
			});
  };
  
  
  
  
  
  
  
  
  
};
module.exports = new NewProjectPage();
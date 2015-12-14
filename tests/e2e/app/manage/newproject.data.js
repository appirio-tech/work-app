// store user data in maps for ease of use and readability...
var NewProjectData = function() {
//    this.testUser = {'baseUrl': 'https://www.topcoder-dev.com/work/#/login', 'username': 'DhananjayKumar1', 'password': 'appirio123'}
    this.userCredentials = [ 
                             {	
                            	 'username' : 'beta14',
                            	 'password' : 'appirio123' 
                             }
                           ],
                           
   this.design = { 'fonts' : ['SERIF', 'SANSSERIF'],
    		       'colors' : ['BLUE','RED','GREEN','ORANGE','BLACK'],
    		       'icons' : ['FLAT COLOR', 'THIN LINE', 'SOLID LINE']
    			  },
   this.develop = {
    				'securityLevel' : ['STANDARD','ENHANCED','MAXIMUM SECURITY']
    }, 			  
                           
   this.featureList = [{
	   						'mainCategory' : 'LOGIN & REGISTRATION',
	   						'subCategories' : ['Email Login',
	   						                   'Social Login',
	   						                   'Invitations',
	   						                   'Introductions',
	   						                   'Onboarding'
	   						                   ],
   					  }, {'mainCategory' : 'GENERAL BUILDING BLOCKS',
	   						'subCategories' : ['Search',
	   						                   'Geolocation Features',
	   						                   'Camera (Audio & Video)',
	   						                   'File Upload',
	   						                   'Notifications',
	   						                   'Sharing',
	   						                   'Tags',
	   						                   'Admin Functionality',
	   						                   'Account Settings',
	   						                   'Dashboard',
	   						                   'Help'
	   						                   ],
   						  
   					  },{
   						  'mainCategory' : 'ECOMMERCE',
   						  'subCategories' : ['Marketplace',
   						                   'Ratings & Reviews',
   						                   'Payments',
   						                   'Shopping Cart',
   						                   'Product Listing'
   						                   ]
   					  },{
   						  'mainCategory' : 'SOCIAL',
   						  'subCategories' : ['Activity Feed',
   						                   'Profiles',
   						                   'Messaging'
   						                   ]
   					  }
   
   ],                        
    
    this.projectList = [
                        {
                        	'name' : 'DEVELOPEMENT',
                        	'deviceTypes' : ['iWatch', 'iPad'],
                            'orientations' : ['Landscape'],	             
                        	'type' :'DESIGN & DEVELOPMENT',
                        	'uploadFiles' : ['/Users/abdulmansoori/Downloads/1.pdf', '/Users/abdulmansoori/Downloads/2.pdf'],
                        	'styleUrl' : 'www.doogle.com',
                        	'design' : {
			                        		'font' : 'SANS SERIF',
			                            	'colors' : ['GREEN', 'BLACK'],
			                            	'icon' : 'THIN LINE'
			                        	},
                        	'develop' : {
                        					'offlineAccess' : 'n',
                        					'personalInformation' : 'y',
                        					'securityLevel' : 'ENHANCED',
                        					'thirdPartyCount' : '2'
                        				},            
                        	'brief' : 'This is demo project for testing manage project',
                        	'featureList' : [
                        	                 { 'mainCategory' : 'GENERAL BUILDING BLOCKS', 
                        	                   'subCategories' : [
                        	                                      {
                        	                                    	  'name'  : 'Search',
                        	                                    	  'notes' :  'This is Search Feature' 
                        	                                      }/*,
                        	                                      {
                        	                                    	  'name'  : 'File Upload',
                           	                                       	'notes' :  'This is File upload Feature' 
                        	                                    	  
                        	                                      }*/
                        	                                      ]
                        	                   },
                        	                   {
                       	   						'mainCategory' : 'LOGIN & REGISTRATION',
                       	   						'subCategories' : [{
                       	   											'name' : 'Email Login',
                       	   											'notes' : 'This is Email Login'
                       	   											}
                       	   						                   ],
                          					  }
                        	                 ],
                        	'workSummary' : 'This summary should be at least of 200 words, otherwise we will not able to see next button. so keep typing whether you like it or not, you have to put some text here for our reference. please do not hesitate to ask question'
                        }/*,
                        {
                        	'name' : 'Test Project -Aq311',
                        	'deviceTypes' : [
                        	             {
                        	            	 'name' : 'iWatch'
                        	             }
                        	             ],
                        	'type' :'Design',
                        	'upload' : 'no',
                        	'description' : 'This is demo project for testing manage project',
                        	'competitorAppList' :[{
                        		'appName' : 'Login App',
                        	},{
                        		'appName' : 'WhatsApp'
                        	}],
                        	'featureList' : [ 
                        	    { 'featureName' : 'login', 'explanation' : 'it is login feature'},
                        	    {'featureName' : 'profiles', 'explanation' : 'it is profiles feature'},
                        	    {'featureName' : 'forms', 'explanation' : 'it is forms feature'},
                        	    {'featureName' :'social', 'explanation' : 'it is social login feature'},
                        	    {'featureName' : 'map', 'explanation' : 'it is map feature'},
                        	    {'featureName' : 'listing', 'explanation' : 'it is listing feature'},
                        	    {'featureName' : 'new-feature', 'name' : 'Awsome Name', 'explanation' : 'Awsome explanation'}
                        		],
                        
                        	'acceptTerms' :'Y',
                        	'workSummary' : 'This summary should be at least of 200 words, otherwise we will not able to see next button. so keep typing whether you like it or not, you have to put some text here for our reference. please do not hesitate to ask question'
                        }*/
                       ],
    
    this.noDeviceTypeProjectList = [{
    	'name' : 'aqytesting',
    	'deviceTypes' : []
    }] ,    
    
    this.noOrientationProjectList = [{
    	'name' : 'aqytesting',
    	'deviceTypes' : [ 'IPhone'],
    	'orientations' : []               
    }] ,  
    this.noWorkTypeProjectList = [{
    	'name' : 'aqytesting',
    	'deviceTypes' : [ 'IPhone'],
    	'orientations' : ['Landscape'],
    	'type' : ''
    }], 
    this.allWorkTypeProjectList = [{
    	'name' : 'aqytesting',
    	'deviceTypes' : [ 'IPhone'],
    	'orientations' : ['Landscape'],
    	'allType' : 'y'
//    	'type' : ['','']
    }], 
    this.noOverviewProjectList = [{
    	'name' : 'aqytesting',
    	'deviceTypes' : [ 'IPhone'],
    	'orientations' : ['Landscape'],
    	'type' : 'DESIGN',
    	'brief' : ''
    }], 
    this.errMsg = {
    					'deviceErrMsg' : 'Please choose a device.',
    					'orientationErrMsg' :'Please choose an orientation.',
    					'typeErrMsg' : 'Please choose a type of work.',
    					'briefErrMsg' : 'Please enter project details.'
    			  },
    this.baseUrl = 'http://work.topcoder-qa.com/login',
    this.manageProjectUrl = 'http://work.topcoder-qa.com/manage';
};
module.exports = new NewProjectData;
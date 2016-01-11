// store user data in maps for ease of use and readability...
var ProjectDetails = function() {
    this.userCredentials = [ 
                             {	
                            	 'username' : 'beta14',
                            	 'password' : 'appirio123' 
                             }
                           ],
                           
    this.projectList = [
                        {
                        	'name' : 'ss1demo',
                        	'deviceTypes' : ['IWatch'],
                        	'orientations' : ['Portrait'],	             
                        	'type' :'DESIGN & DEVELOPMENT',
                        	'uploadFeatures' : ['Screen Shot 2015-12-18 at 1.00.02 PM.png'],
                        	'uploadDesignDocs' : ['Screen Shot 2015-12-18 at 1.00.02 PM.png'],
                        	'uploadFiles' : ['/Users/abdulmansoori/Downloads/1.pdf', '/Users/abdulmansoori/Downloads/2.pdf'],
                        	'styleUrl' : 'http://google.com',
                        	'wrongStyleUrl' : 'doogh',
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
                        	                	                    	'notes' :  'r' 
                        	                	                    }
                        	                	                    ]
                        	                 }
                        	                 ],
                        	  'defineNewFeatures' : [
                        	                         	{
                        	                        	 'name' : 'first new feature',
                        	                        	 'description' : 'first feature desc',
                        	                        	 'notes' : 'This is first new feature'
                        	                         	}, {
                        	                        	 'name' : 'Second new feature',
                        	                        	 'description' : 'second feature desc',
                        	                        	 'notes' : 'This is second new feature'
                        	                         	} 
                        	                         ],             
                                               	'workSummary' : 'This summary should be at least of 200 words, otherwise we will not able to see next button. so keep typing whether you like it or not, you have to put some text here for our reference. please do not hesitate to ask question'
                        }],                           
    
    this.baseUrl = 'http://connect.topcoder-qa.com/login';
};
module.exports = new ProjectDetails;
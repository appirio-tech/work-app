// store user data in maps for ease of use and readability...
var NewProjectData = function() {
//    this.testUser = {'baseUrl': 'https://www.topcoder-dev.com/work/#/login', 'username': 'DhananjayKumar1', 'password': 'appirio123'}
    this.userCredentials = [ 
                             {	
                            	 'username' : 'DhananjayKumar1',
                            	 'password' : 'appirio123' 
                             }
                           ],
    
    this.projectList = [
                        {
                        	'name' : 'Test Project -Aq311',
                        	'type' :'Design',
                        	'upload' : 'yes',
                        	'description' : 'This is demo project for testing manage project',
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
                        	'workSummary' : '12345678901234567890'
                        },
                        {
                        	'name' : 'Test Project -Aq322',
                        	'type' :'Design',
                        	'upload' : 'yes',
                        	'description' : 'This is demo project for testing manage project',
                        	'featureList' : ['login'],
                        	'acceptTerms' :'Y',
                        	'workSummary' : '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                        }
                       ],
    
    this.baseUrl = 'https://www.topcoder-dev.com/work/login',
    this.manageProjectUrl = 'https://www.topcoder-dev.com/work/manage';
};
module.exports = new NewProjectData;
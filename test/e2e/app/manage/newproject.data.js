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
                        	'name' : 'Test Project -Aq1009',
                        	'type' :'Design',
                        	'upload' : 'no',
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
                        	'workSummary' : '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678900'
                        },
                        {
                        	'name' : 'Test Project -Aq322',
                        	'type' :'Design',
                        	'upload' : 'no',
                        	'description' : 'This is demo project for testing manage project',
                        	'featureList' : ['login'],
                        	'acceptTerms' :'Y',
                        	'workSummary' : '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                        }
                       ],
    
    this.baseUrl = 'http://work.topcoder-dev.com/#/login',
    this.manageProjectUrl = 'http://work.topcoder-dev.com/#/manage';
};
module.exports = new NewProjectData;
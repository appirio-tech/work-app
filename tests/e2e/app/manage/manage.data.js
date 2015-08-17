// store user data in maps for ease of use and readability...
var ManageData = function() {
//    this.testUser = {'baseUrl': 'https://www.topcoder-dev.com/work/#/login', 'username': 'DhananjayKumar1', 'password': 'appirio123'}
    this.userCredentials = [ 
                             {	
                            	 'username' : 'DhananjayKumar1',
                            	 'password' : 'appirio123' 
                             },
                             {
                            	 'username' : 'aqmansuri',
                            	 'password' : 'appirio123'
                             }
                           ],
    
    this.projectList = [
                        {   'oldProjectName' : 'Dummy Project -Aq1123',
                        	'name' : 'Test Project -Aq23',
                        	'type' :'Design',
                        	'upload' : 'yes',
                        	'competitorAppList' :[{
                        		'appName' : 'Login App',
                        	},{
                        		'appName' : 'WhatsApp'
                        	}],
                        	'description' : 'This is demo project for testing manage project 23',
                        	'featureList' : [
                        		{ 'featureName' : 'login', 'explanation' : 'it is login feature'},
                        	    {'featureName' : 'profiles', 'explanation' : 'it is profiles feature'},
                        	    {'featureName' : 'forms', 'explanation' : 'it is forms feature'},
                        	    {'featureName' :'social', 'explanation' : 'it is social login feature'},
                        	    {'featureName' : 'map', 'explanation' : 'it is map feature'},
                        	    {'featureName' : 'listing', 'explanation' : 'it is listing feature'},
                        	    {'featureName' : 'new-feature', 'name' : 'Awsome Name', 'explanation' : 'Awsome explanation'}
                        	    ],
                        	'acceptTerms' :'Y'
                        }/*,
                        
                        {
                        	'name' : 'Test Project -Aq45',
                        	'type' :'Design',
                        	'upload' : 'no',
                        	'description' : 'This is demo project for testing manage project 45',
                        	'featureList' : ['login'],
                        	'acceptTerms' :'Y',
                        	'workSummary' : '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                        }*/
                       ],
    
    this.baseUrl = 'http://work.topcoder-dev.com/#/login',
    this.manageProjectUrl =  'http://work.topcoder-dev.com/#/manage';
};
module.exports = new ManageData;
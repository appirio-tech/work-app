// store user data in maps for ease of use and readability...
var NewProjectData = function() {
//    this.testUser = {'baseUrl': 'https://www.topcoder-dev.com/work/#/login', 'username': 'DhananjayKumar1', 'password': 'appirio123'}
    this.userCredentials = [ 
                             {	
                            	 'username' : 'aqmansuri',
                            	 'password' : 'appirio123' 
                             }
                           ],
    
    this.projectList = [
                        {
                        	'name' : 'Test Project -Aq311',
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
                        },
                        {
                        	'name' : 'Test Project -Aq322',
                        	'type' :'Design',
                        	'upload' : 'no',
                        	'description' : 'This is demo project for testing manage project',
                        	'competitorAppList' :[{
                        		'appName' : 'Login App',
                        	},{
                        		'appName' : 'WhatsApp'
                        	}],
                        	'featureList' : [
                        	                 { 'featureName' : 'login', 'explanation' : 'it is login feature'}
                        	                 ],
                        	'acceptTerms' :'Y',
                        	'workSummary' : 'This summary should be at least of 200 words, otherwise we will not able to see next button. so keep typing whether you like it or not, you have to put some text here for our reference. please do not hesitate to ask question'
                        }
                       ],
    
    this.baseUrl = 'http://work.topcoder-dev.com/#/login',
    this.manageProjectUrl = 'http://work.topcoder-dev.com/#/manage';
};
module.exports = new NewProjectData;
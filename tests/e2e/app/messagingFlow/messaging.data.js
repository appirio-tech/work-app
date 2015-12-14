// store user data in maps for ease of use and readability...
var MessagingData = function() {
//    this.testUser = {'baseUrl': 'https://www.topcoder-dev.com/work/#/login', 'username': 'DhananjayKumar1', 'password': 'appirio123'}
    this.userCredentials = [ 
                             {	
                            	 'username' : 'DhananjayKumar1',
                            	 'password' : 'appirio123$' 
                             },
                             {
                            	 'username' : 'aqmansuri',
                            	 'password' : 'appirio123'
                             }
                           ],
                           
  this.messageBoxMessageList = [
                             {
                            	 'customerMessage' : 'hi, i am testing this page. please let me know- aqmansuri',
                            	 'copilotMessage' : 'hi, i am ready-- your copilot -DhananjayKumar1'
                             }
                             ],                           
    
    this.projectList = [
                        {   projectNumber : 1,
                        	projectType : 'Design',
                        	projectCount : '2',
                        	projectDifficulty : 'Medium',
                        	projectDifficultyExplanation : 'lets check difficulty level',
                        	oldProjectName : 'Aq123',
                        	customerMessage : 'hi.. i am customer',
                        	copilotMessage : 'hi i am copilot',
                        	'name' : 'Aq123',
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
                        	'workSummary' : 'This summary should be at least of 200 words, otherwise we will not able to see next button. so keep typing whether you like it or not, you have to put some text here for our reference. please do not hesitate to ask question',
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
    
    this.baseUrl = 'http://work.topcoder-qa.com/login',
    this.manageProjectUrl =  'http://work.topcoder-qa.com/manage';
};
module.exports = new MessagingData;
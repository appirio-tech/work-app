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
                        	'name' : 'Test Project -Aq11',
                        	'type' :'Design',
                        	'upload' : 'yes',
                        	'description' : 'This is demo project for testing manage project',
                        	'featureList' : ['login'],
                        	'acceptTerms' :'Y'
                        },
                        {
                        	'name' : 'Test Project -Aq22',
                        	'type' :'Design',
                        	'upload' : 'yes',
                        	'description' : 'This is demo project for testing manage project',
                        	'featureList' : ['login'],
                        	'acceptTerms' :'Y',
                        	'workSummary' : '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                        }
                       ],
    
    this.baseUrl = 'https://www.topcoder-dev.com/work/#/login',
    this.manageProjectUrl = 'https://www.topcoder-dev.com/work/#/manage';
};
module.exports = new NewProjectData;
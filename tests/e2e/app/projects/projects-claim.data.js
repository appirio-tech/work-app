// store user data in maps for ease of use and readability...
var ProjectClaimData = function() {
//    this.testUser = {'baseUrl': 'https://www.topcoder-dev.com/work/#/login', 'username': 'DhananjayKumar1', 'password': 'appirio123'}
    this.userCredentials = [ 
                             {	
                            	 'username' : 'aqmansuri',
                            	 'password' : 'appirio123' 
                             }
    
                             ],
                             
    this.estimateProjectList = [                         
                                { 
                                	projectNumber : 1,
                                	projectType : 'Design',
                                	projectCount : '2',
                                	projectDifficulty : 'Medium',
                                	projectDifficultyExplanation : 'lets check difficulty level'
                                }/*,
                                {
                                	projectNumber : 2,
                                	projectType : 'Code',
                                	projectCount : '3',
                                	projectDifficulty : 'Medium',
                                	projectDifficultyExplanation : 'lets check difficulty level again'
                                }*/
    	
                                ],
    
    this.baseUrl = 'http://work.topcoder-qa.com/login',
    this.manageProjectUrl = 'http://work.topcoder-qa.com/manage';
    this.openProjectsUrl = 'http://work.topcoder-qa.com/projects/open';
};
module.exports = new ProjectClaimData;
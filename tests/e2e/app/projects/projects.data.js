// store user data in maps for ease of use and readability...
var ProjectData = function() {
//    this.testUser = {'baseUrl': 'https://www.topcoder-dev.com/work/#/login', 'username': 'DhananjayKumar1', 'password': 'appirio123'}
    this.userCredentials = [ 
                             {	
                            	 'username' : 'DhananjayKumar1',
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
                                },
                                {
                                	projectNumber : 2,
                                	projectType : 'Code',
                                	projectCount : '3',
                                	projectDifficulty : 'Medium',
                                	projectDifficultyExplanation : 'lets check difficulty level again'
                                }
    	
                                ],
    
    this.baseUrl = 'http://work.topcoder-dev.com/login',
    this.manageProjectUrl = 'http://work.topcoder-dev.com/manage';
};
module.exports = new ProjectData;
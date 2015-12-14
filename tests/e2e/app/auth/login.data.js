
// store user data in maps for ease of use and readability...
var LoginData = function() {
    this.userCredentials = [
                            	{	'username' :'beta14',
                            		'password' :'appirio123' 
                            	}/*,
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}*/
                           ],
    this.baseUrl = 'http://work.topcoder-qa.com/login';
    
};
module.exports = new LoginData;
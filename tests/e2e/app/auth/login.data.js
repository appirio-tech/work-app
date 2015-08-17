
// store user data in maps for ease of use and readability...
var LoginData = function() {
    this.userCredentials = [
                            	{	'username' :'aqmansuri',
                            		'password' :'appirio123' 
                            	},
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}
                           ],
    this.baseUrl = 'http://work.topcoder-dev.com/#/login';
    
};
module.exports = new LoginData;
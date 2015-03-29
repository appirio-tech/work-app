/*global form:true */
(function () {
  'use strict';

  angular.module('app.login').controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$http', 'auth', '$location', 'store', 'LoginService', 'logger'];
  /* @ngInject */
  function LoginController($scope, $http, auth, $location, store, LoginService, logger) {
    var vm = this;
    vm.title = 'Login';
    vm.loggedInUser = '';
    vm.user ='';

    function activate() {
      logger.info('Activated Login View'); 
      setToken();
    }
    
    function getParameterByName(name) {
	  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	      results = regex.exec(location.hash);
	  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
    
    function decodeJwt() {
        var decoded = jwt_decode(localStorage.getItem("userJWTToken"));
        if(decoded && decoded.userId){
          vm.loggedInUser = decoded.userId;
        }     
    }
    
    function setToken(){
      //set parameter passed JWT token and remove if any.
	  var userJWTToken = getParameterByName('userJWTToken');
	  //logger.info("userJWTToken : " +userJWTToken);
	  if(userJWTToken && localStorage) {
        localStorage.setItem('userJWTToken', userJWTToken);
        //$http.defaults.headers.common['Authorization'] = 'Bearer '+userJWTToken;
        var clean_uri = location.protocol + "//" + location.host + location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
        decodeJwt();
        vm.user = LoginService.getUser(vm.loggedInUser);
	  }
    }
    
    activate();
	
	// auth0 login form
	var clientId = 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT';
	var domain = 'topcoder-dev.auth0.com';
	var lock = new Auth0Lock(clientId, domain);
	$scope.signin = function() {
	  var state = encodeURIComponent('retUrl=http://localhost:3000/#/');
      lock.show({
          callbackURL: 'http://api.topcoder-dev.com/pub/callback.html'
        , responseType: 'code'
        , connections: ['LDAP']
        , authParams: {
          scope: 'openid profile offline_access',
          state: state
        }
        , usernameStyle: 'username'
      });
	}
	
	$scope.signout = function() {
	  LoginService.logout();
	}
  }
})();

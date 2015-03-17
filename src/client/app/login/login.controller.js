(function(){
	'use strict';
	angular
		.module( 'app.login')
		.controller( 'LoginCtrl', LoginCtrl);
	
	LoginCtrl.$inject = ['$scope', 'auth', '$location', 'store', 'logger'];
	/* @ngInject */
	function LoginCtrl( $scope, auth, $location, store, logger) {
	  var vm = this;
	  vm.loggedInUser = null;
	  activate();

	  function activate() {
	      logger.info('Activated login View');
	  }
      
	  $scope.login = function() {
	    auth.signin({}, function(profile, token) {
	      // Success callback
	      store.set('profile', profile);
	      store.set('token', token);
	      vm.loggedInUser = profile.name;
	      console.log('logged in user ' + vm.loggedInUser);
	      $location.path('/');
	    }, function(err) {
	      console.log("Error :(", err);
	    });
	  }
	  
	  $scope.logout = function() {
		  auth.signout();
		  store.remove('profile');
		  store.remove('token');
		}
	}
})();

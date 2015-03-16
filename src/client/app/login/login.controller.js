(function(){
	'use strict';
	angular
		.module( 'app.login', ['auth0'])
		.controller( 'LoginCtrl', LoginCtrl);
	
	LoginCtrl.$inject = ['logger'];
	/* @ngInject */
	function LoginCtrl( $scope, auth, $location, store, logger) {
	  $scope.login = function() {
		    auth.signin({
		    username: $scope.username,
		    password: $scope.password,
		    connection: ['Username-Password-Authentication']
		  }, function() {
		    // All good
		    $location.path('/');
		  }, function(error) {
		    // Error
		  })
	  }	
	}
})();

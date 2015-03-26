/*global form:true */
(function () {
  'use strict';

  angular.module('app.login').controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'auth', '$location', 'store', 'logger'];
  /* @ngInject */
  function LoginController($scope, auth, $location, store, logger) {
    var vm = this;
    vm.title = 'Login';

    function activate() {
      logger.info('Activated Login View');
    }
    
    $scope.login = function() {
	  auth.signin({}, function(profile, token) {
	    // Success callback
	    store.set('profile', profile);
	    store.set('token', token);
	    vm.loggedInUser = profile.name;
	    console.log('logged in user ' + vm.loggedInUser);
	    $location.path('/');
	  },function(err) {
	      console.log("Error :(", err);
	    });
	}
	  
	$scope.logout = function() {
	  auth.signout();
	  store.remove('profile');
	  store.remove('token');
	  $location.path('/');
	}
  }
})();

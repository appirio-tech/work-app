/*global form:true, Auth0Lock:true */
(function () {
  'use strict';

  angular.module('app.auth')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$rootScope', '$location', '$state', 'AuthService', 'logger'];

  /* @ngInject */
  function RegisterController($rootScope, $location, $state, AuthService, logger) {
    var vm = this;
    vm.title = 'Login';
    vm.username  = '';
    vm.password = '';
    vm.error = false;
    vm.errorMessage = 'Error Creating User';

    vm.submit = null;

    activate();

    vm.submit = function() {
      vm.error = false;
      var registerOptions = {
        username: vm.username,
        password: vm.password,
        email: vm.email
      };
      AuthService.register(registerOptions)
        .then(registerSuccess, registerError);
    };

    function activate() {
      logger.log('Activated Login View');
    }

    function registerError(error) {
      vm.error = true;
      vm.errorMessage = error;
      logger.error(error);
    }

    function registerSuccess() {
      vm.error = false;

      // Redirect to a url sent in
      var urlToken = $location.search();

      if (urlToken.retUrl) {
        $location.path(urlToken.retUrl).replace();
      } else if (urlToken.retState) {
        $state.go(urlToken.retState);
      } else if ($rootScope.preAuthState) {
        // Look for a last state.  Redirect if it exists
        $state.go($rootScope.preAuthState);
      } else {
        // if all else fails go to the home screen
        $state.go('view-work-multiple');
      }
    }
  }
})();

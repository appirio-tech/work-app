/*global form:true, Auth0Lock:true */
(function () {
  'use strict';

  angular.module('app.auth')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$rootScope', '$location', '$state', 'AuthService', 'UserService', 'logger'];

  /* @ngInject */
  function RegisterController($rootScope, $location, $state, AuthService, UserService, logger) {
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
        handle: vm.username,
        password: vm.password,
        email: vm.email
      };
      UserService.createUser(registerOptions)
        .then(registerSuccess, registerError);
    };

    function activate() {
      logger.log('Activated Registration View');
    }

    function registerError(error) {
      vm.error = true;
      vm.errorMessage = error;
      logger.error(error);
    }

    function registerSuccess() {
      vm.error = false;

      var loginOptions = {
        username: vm.username,
        password: vm.password,
        success: success
      };

      AuthService.login(loginOptions);

      function success() {
        $state.go('view-work-multiple');
      }
    }
  }
})();

/*global form:true, Auth0Lock:true */
(function () {
  'use strict';

  angular.module('app.auth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'AuthService', 'logger'];

  /* @ngInject */
  function LoginController($scope, AuthService, logger) {
    var vm = this;
    vm.title = 'Login';
    vm.username  = '';
    vm.password = '';

    vm.submit = submit;

    function submit() {
      var loginOptions = {
        username: vm.username,
        password: vm.password,
        error: loginFailure
      };
      AuthService.login(loginOptions);
    }

    activate();

    function activate() {
      logger.log('Activated Login View');
    }

    function loginSuccess(profile, idToken, accessToken, state, refreshToken) {
      logger.log('success', profile);
    }

    function loginFailure(error) {
      logger.log('error', error);
    }
  }
})();

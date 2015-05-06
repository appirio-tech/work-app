(function () {
  'use strict';

  angular.module('app.auth')
    .directive('login', loginDirective);

  loginDirective.$inject = [];

  function loginDirective() {
    var directive = {
      restrict    : 'EA',
      templateUrl : 'auth/views/login-directive.html',
      controller: LoginDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  LoginDirectiveController.$inject = ['$scope', '$state', 'UserService', 'AuthService'];

  function LoginDirectiveController($scope, $state, UserService, AuthService) {
    var vm = this;

    vm.loggedInUser = UserService.user;
    vm.isLoggedIn = AuthService.isAuthenticated();
    vm.signout = signout;
    vm.signin = signin;

    function signin() {
      $state.go('login');
    }

    function signout() {
      AuthService.logout()
        .then(function() {
          $state.reload();
        });
    }
  }

})();

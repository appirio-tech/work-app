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

  LoginDirectiveController.$inject = ['$scope', '$rootScope', '$state', 'UserService', 'AuthService'];

  function LoginDirectiveController($scope, $rootScope, $state, UserService, AuthService) {
    var vm = this;

    vm.loggedInUser = UserService.getUser();
    vm.isLoggedIn = AuthService.isAuthenticated();
    vm.signout = signout;
    vm.signin = signin;

    activate();

    function activate() {
      $rootScope.$on('logout', function() {
        updateDisplay();
      });

      $rootScope.$on('authenticated', function() {
        updateDisplay();
      });
    }

    function updateDisplay() {
      vm.isLoggedIn = AuthService.isAuthenticated();
      vm.loggedInUser = UserService.getUser();
    }

    function signin() {
      $state.go('login');
    }

    function signout() {
      AuthService.logout()
        .then(function() {
          $state.go('home');
        });
    }
  }

})();

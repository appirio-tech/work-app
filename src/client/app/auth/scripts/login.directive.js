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

    vm.handle = null;
    vm.isLoggedIn = AuthService.isAuthenticated();
    vm.signout = null;
    vm.signin = null;

    activate();

    function activate() {
      $rootScope.$on('logout', function() {
        updateDisplay();
      });

      $rootScope.$on('authenticated', function() {
        updateDisplay();
      });

      updateDisplay();
    }

    function updateDisplay() {
      vm.isLoggedIn = AuthService.isAuthenticated();
      UserService.getCurrentUser()
        .then(function(data) {
          vm.handle = data.result.content.handle
        });
    }

    vm.signin = function() {
      $state.go('login');
    };

    vm.signout = function() {
      AuthService.logout()
        .then(function() {
          $state.go('home');
        });
    }
  }

})();

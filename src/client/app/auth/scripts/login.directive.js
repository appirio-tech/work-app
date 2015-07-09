(function () {
  'use strict';

  angular.module('app.auth')
    .directive('login', loginDirective);

  loginDirective.$inject = [];

  function loginDirective() {
    var directive = {
      restrict        : 'EA',
      templateUrl     : 'auth/views/login-directive.html',
      controller      : LoginDirectiveController,
      controllerAs    : 'vm',
      bindToController: true,
      scope           : true
    };

    return directive;
  }

  LoginDirectiveController.$inject = ['$scope', '$rootScope', '$state', 'UserService', 'AuthService', 'logger'];

  function LoginDirectiveController($scope, $rootScope, $state, UserService, AuthService, logger) {
    var vm = this;

    vm.handle = null;
    vm.isLoggedIn = AuthService.isAuthenticated();
    vm.signout = null;
    vm.signin = null;

    activate();

    function activate() {
      $rootScope.$on('logout', function() {
        vm.handle = null;
        updateDisplay();
      });

      $rootScope.$on('authenticated', function() {
        updateDisplay();
      });

      updateDisplay();
    }

    function updateDisplay() {
      vm.isLoggedIn = AuthService.isAuthenticated();
      var promise = UserService.getCurrentUser();

      promise.then(setUser, setUserError);
    }

    function setUser(user) {
      vm.handle = user.handle
    }

    function setUserError(reason) {
      vm.handle = null;
      logger.error(reason);
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

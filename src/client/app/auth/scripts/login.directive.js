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

  LoginDirectiveController.$inject = ['$scope', '$rootScope', '$state', 'UserV3Service', 'AuthService', 'logger'];

  function LoginDirectiveController($scope, $rootScope, $state, UserV3Service, AuthService, logger) {
    var vm = this;

    vm.handle     = null;
    vm.isLoggedIn = AuthService.isAuthenticated();
    vm.signout    = null;
    vm.signin     = null;

    activate();

    function activate() {
      if (!AuthService.isLoggedIn()) {
        vm.handle = null;
      }
      updateDisplay();
    }

    function updateDisplay() {
      vm.isLoggedIn = AuthService.isAuthenticated();
      $scope.$watch(UserV3Service.getCurrentUser, function() {
        setUser(UserV3Service.getCurrentUser);
      });
    }

    function setUser(user) {
      vm.handle = user.handle
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

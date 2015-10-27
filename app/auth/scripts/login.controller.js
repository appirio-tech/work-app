/*global form:true, Auth0Lock:true */
(function () {
  'use strict';

  angular.module('app.auth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', '$location', '$state', 'AuthService', 'UserV3Service'];

  /* @ngInject */
  function LoginController($rootScope, $location, $state, AuthService, UserV3Service) {
    var vm = this;
    vm.title = 'Login';
    vm.username  = '';
    vm.password = '';
    vm.error = false;

    vm.submit = null;

    activate();

    vm.submit = function() {
      vm.error = false;
      var loginOptions = {
        username: vm.username,
        password: vm.password,
        error: loginFailure,
        success: loginSuccess
      };
      AuthService.login(loginOptions);
    };

    function activate() {
    }

    function loginFailure(error) {
      vm.error = true;
    }

    function loginSuccess() {
      vm.error = false;

      UserV3Service.loadUser().then(function(currentUser) {
        var urlToken = $location.search();

        if (urlToken.retUrl) {
          $location.path(urlToken.retUrl).replace();
        } else if (urlToken.retState) {
          $state.go(urlToken.retState);
        } else if ($rootScope.preAuthState) {
          var preAuthState = $rootScope.preAuthState
          delete $rootScope.preAuthState
          $state.go(preAuthState);
        } else if (currentUser.role == 'customer') {
          $state.go('view-work-multiple');
        } else if (currentUser.role == 'copilot') {
          $state.go('copilot-projects');
        } else {
          $state.go('home');
        }
      });
    }
  }
})();

(function () {
  'use strict';

  angular.module('app.login').run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'login',
        config: {
          url         : '/login',
          templateUrl : 'login/views/login.html',
          controller  : 'LoginController',
          controllerAs: 'vm',
          title       : 'Login'
        }
      },
    ];
  }
})();


(function () {
  'use strict';

  angular
    .module('app.create-account')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          url: '/create-account',
          templateUrl: 'create-account/views/create-account.html',
          controller: 'CreatedAccountController',
          controllerAs: 'vm',
          title: 'Create Account',
        }
      },
    ];
  }
})();

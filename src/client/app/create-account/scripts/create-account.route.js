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
        state: 'create-account',
        config: {
          url: '/create-account',
          templateUrl: 'create-account/views/create-account.html',
          controller: 'CreateAccountController',
          controllerAs: 'vm',
          title: 'Create Account',
        }
      },
    ];
  }
})();


(function () {
  'use strict';

  angular
    .module('app.getting-started')
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
          url: '/',
          templateUrl: 'getting-started/views/getting-started.html',
          controller: 'GettingStartedController',
          controllerAs: 'vm',
          title: 'Getting Started',
          data: {
            noAuthRequired: true
          }
        }
      }
    ];
  }
})();

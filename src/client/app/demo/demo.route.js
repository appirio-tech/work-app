(function () {
  'use strict';

  angular
    .module('app.demo')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'manage',
        config: {
          url: '/manage',
          templateUrl: 'demo/manage.html',
          controller: 'TimelineController',
          controllerAs: 'vm',
          title: 'Timeline',
          settings: {}
        }
      }
    ];
  }
})();

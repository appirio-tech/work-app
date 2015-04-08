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
        state: 'timeline',
        config: {
          url: '/timeline',
          templateUrl: 'demo/timeline.html',
          controller: 'TimelineController',
          controllerAs: 'vm',
          title: 'Timeline',
          settings: {}
        }
      },
      {
        state: 'timeline-detail',
        config: {
          url: '/timeline/detail',
          templateUrl: 'demo/timeline-detail.html',
          controller: 'TimelineController',
          controllerAs: 'vm',
          title: 'Detail',
          settings: {}
        }
      },
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

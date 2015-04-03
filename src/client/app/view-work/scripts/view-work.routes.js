(function () {
  'use strict';

  angular
    .module('app.view-work')
    .run(runApp);

  runApp.$inject = ['routerHelper', '$stateParams', 'data'];
  /* @ngInject */
  function runApp(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'view-work-multiple',
        config: {
          url: '/work',
          templateUrl: 'view-work/views/view-work-multiple.html',
          controller: 'ViewWorkMultiController',
          controllerAs: 'vm',
          title: 'View Work',
          settings: {},
          resolve : {
            workRequests : function ($stateParams, data) {
              return data.get('work-request', $stateParams);
            }
          }
        }
      },
      {
        state: 'view-work-single',
        config: {
          url: '/work/:id',
          templateUrl: 'view-work/views/view-work-single.html',
          controller: 'ViewWorkSingleController',
          controllerAs: 'vm',
          title: 'View Work',
          settings: {},
          resolve : {
            workRequest : function ($stateParams, data) {
              return data.get('work-request', $stateParams);
            }
          }
        }
      }
    ];
  }
})();


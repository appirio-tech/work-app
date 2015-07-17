(function () {
  'use strict';

  angular
    .module('app.manage')
    .run(runApp);

  runApp.$inject = ['routerHelper', 'ManageService', 'SubmitWorkService'];
  /* @ngInject */
  function runApp(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'view-work-multiple',
        config: {
          url: '/manage',
          templateUrl: 'manage/views/manage.html',
          controller: 'ManageController',
          controllerAs: 'vm',
          title: 'View Work',
          params: {
            saved: false
          },
          resolve: {
            workRequests: ['ManageService', function(ManageService) {
              return ManageService.getWorkRequests();
            }]
          }
        }
      },
      {
        state: 'view-work-multiple.confirmed',
        config: {
          url: '/confirmed',
          templateUrl: 'manage/views/confirmed.html'
        }
      }
    ];
  }
})();

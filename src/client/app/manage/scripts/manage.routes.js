(function () {
  'use strict';

  angular
    .module('app.manage')
    .run(runApp);

  runApp.$inject = ['routerHelper', 'ManageService'];
  /* @ngInject */
  function runApp(routerHelper, ManageService) {
    routerHelper.configureStates(getStates(ManageService));
  }

  function getStates(ManageService) {
    return [
      {
        state: 'view-work-multiple',
        config: {
          url: '/manage',
          templateUrl: 'manage/views/manage.html',
          controller: 'ManageController',
          controllerAs: 'vm',
          title: 'View Work',
          settings: {},
          resolve: {
            workRequests: function() {
              return ManageService.getWorkRequests();
            }
          }
        }
      }
    ];
  }
})();

(function () {
  'use strict';

  angular
    .module('app.manage')
    .run(runApp);

  runApp.$inject = ['routerHelper', '$stateParams', 'ManageService'];
  /* @ngInject */
  function runApp(routerHelper, $stateParams, ManageService) {
    routerHelper.configureStates(getStates($stateParams, ManageService));
  }

  function getStates($stateParams, ManageService) {
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
          resolve : {
            workRequests : function () {
              return ManageService.getDisplayWorkRequests({});
            }
          }
        }
      }
    ];
  }
})();

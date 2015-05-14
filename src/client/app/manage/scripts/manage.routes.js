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
          settings: {},
          params: {
            save: {}
          },
          resolve: {
            workRequests: ['ManageService', function(ManageService) {
              return ManageService.getWorkRequests();
            }],
            work: ['SubmitWorkService', '$stateParams', function(SubmitWorkService, $stateParams) {
              if ($stateParams.save == 'yes') {
                return SubmitWorkService.save('Submitted', true);
              } else {
                return false;
              }
            }]
          }
        }
      }
    ];
  }
})();

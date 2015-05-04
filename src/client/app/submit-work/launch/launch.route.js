(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'SubmitWorkService'];
  /* @ngInject */
  function appRun(routerHelper, SubmitWorkService) {
    routerHelper.configureStates(getStates(SubmitWorkService));
  }

  function getStates(SubmitWorkService) {
    return [
      {
        state: 'launch-estimate',
        config: {
          url: '/submit-work/launch/estimate',
          templateUrl: 'submit-work/launch/views/estimate.html',
          controller: 'SubmitEstimateController',
          controllerAs: 'vm',
          title: 'Estimate',
          settings: {}
        }
      },
      {
        state: 'launch-success',
        config: {
          url: '/submit-work/launch/success',
          templateUrl: 'submit-work/launch/views/success.html',
          controller: 'SubmitSuccessController',
          controllerAs: 'vm',
          resolve: {
            work: function() {
              return SubmitWorkService.save();
            }
          },
          title: 'Success',
          settings: {}
        }
      }
    ];
  }
})();

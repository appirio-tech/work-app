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
      }
    ];
  }
})();

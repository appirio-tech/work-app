(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'features',
        config: {
          url: '/submit-work/features',
          templateUrl: 'submit-work/features/views/features.html',
          controller: 'SubmitFeaturesController',
          controllerAs: 'vm',
          title: 'Features',
          settings: {}
        }
      }
    ];
  }
})();

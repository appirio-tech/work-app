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
        state: 'terms',
        config: {
          url: '/submit-work/terms',
          templateUrl: 'submit-work/terms/views/terms.html',
          controller: 'TermsController',
          controllerAs: 'vm',
          title: 'Terms & Conditions',
          settings: {}
        }
      }
    ];
  }
})();

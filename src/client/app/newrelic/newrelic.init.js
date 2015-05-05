(function () {
  'use strict';

  appRun.$inject = ['$rootScope', 'NewRelicService'];

  /* @ngInject */
  function appRun($rootScope, NewRelicService) {
    $rootScope.$on('$stateChangeSuccess', NewRelicService.reportCurrentRoute);
  }

  angular
    .module('newrelic')
    .run(appRun);
})();

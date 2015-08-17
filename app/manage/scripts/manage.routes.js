(function () {
  'use strict';

  angular
    .module('app.manage')
    .run(runApp);

  runApp.$inject = ['routerHelper'];
  /* @ngInject */
  function runApp(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
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

(function () {
  'use strict';

  angular
    .module('app.create')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'create',
        config: {
          url: '/create',
          templateUrl: 'app/create/create.html',
          controller: 'CreateController',
          controllerAs: 'vm',
          title: 'Create',
          settings: {
            nav: 4,
            content: '<i class="fa fa-lock"></i> Create'
          }
        }
      }
    ];
  }
})();

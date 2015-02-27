(function () {
  'use strict';

  angular
    .module('app.project-create')
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
          templateUrl: 'app/project-create/create.html',
          controller: 'ProjectCreateController',
          controllerAs: 'vm',
          title: 'ProjectCreate',
          settings: {
            nav: 4,
            content: '<i class="fa fa-lock"></i> Project Create'
          }
        }
      },
      {
        state: 'home',
        config: {
          url: '/',
          templateUrl: 'app/project-create/home.html',
          controller: 'ProjectHomeController',
          controllerAs: 'vm',
          title: 'Home',
          settings: {
          }
        }
      }
    ];
  }
})();

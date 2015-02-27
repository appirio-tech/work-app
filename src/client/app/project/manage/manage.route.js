(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'multiple',
        config: {
          url: '/projects',
          templateUrl: 'app/project/manage/multiple.html',
          controller: 'MultipleProjectController',
          controllerAs: 'vm',
          title: 'Projects',
          settings: {
            nav: 3,
            content: '<i class="fa fa-lock"></i> Projects'
          }
        }
      },
      {
        state: 'single',
        config: {
          url: '/projects/:id',
          templateUrl: 'app/project/manage/single.html',
          controller: 'SingleProjectController',
          controllerAs: 'vm',
          title: 'Manage',
          settings: {
            nav: 3,
            content: '<i class="fa fa-lock"></i> Project'
          }
        }
      }
    ];
  }
})();

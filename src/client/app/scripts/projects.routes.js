(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects').run(runApp);

  runApp.$inject = ['routerHelper', 'ProjectsService', 'ProjectDetailsService'];
  /* @ngInject */
  function runApp(routerHelper) {
    routerHelper.configureStates(getStates(), "/projects");
  }

  function getStates() {
    return [
      {
        state: 'view-projects',
        config: {
          url: '/projects',
          templateUrl: 'views/projectTabs.html',
          controller: 'ProjectsTabController',
          controllerAs: 'vm',
          title: 'View Projects',
          abstract: true,
        }
      }, {
        state: 'view-projects.assigned',
        config: {
        url: '/assigned',
        templateUrl: 'views/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'vm'
        }
      }, {
        state: 'view-projects.open',
        config: {
          url: '/open',
          templateUrl: 'views/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm'
          }
        }
    ];
  }

})();
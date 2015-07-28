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
          templateUrl: 'projects/views/projectTabs.html',
          controller: 'ProjectsTabController',
          controllerAs: 'vm',
          title: 'View Projects',
          abstract: true,
        }
      }, {
        state: 'view-projects.assigned',
        config: {
        url: '/assigned',
        templateUrl: 'projects/views/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'vm',
        resolve: {
          workRequests: ['ProjectsService', function(ProjectsService) {
            return ProjectsService.getAssignedProjects();
          }]
        }
        }
      }, {
        state: 'view-projects.open',
        config: {
          url: '/open',
          templateUrl: 'projects/views/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
          resolve: {
            workRequests: ['ProjectsService', function(ProjectsService) {
              return ProjectsService.getWorkRequests();
            }]
          }
          }
        }
    ];
  }

})();
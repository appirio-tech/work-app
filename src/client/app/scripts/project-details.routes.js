(function () {
  'use strict';

  angular.module('app.project-details').run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'project-details',
      config: {
        url: '/project-details/:id?/:status?',
        title: 'Claim Project',
        controller: 'ProjectDetailsController',
        controllerAs: 'vm',
        resolve: {
          copilotWork: ['$stateParams', 'ProjectDetailsService', function($stateParams, ProjectDetailsService) {
            if ($stateParams.id && $stateParams.status) {
              return ProjectDetailsService.initializeCopilotWork($stateParams.id, $stateParams.status);
            } else if ($stateParams.id) {
                return ProjectDetailsService.initializeCopilotWork($stateParams.id);
            } else {
              return false;
            }
          }]
        },
        templateUrl: 'project-details/project-details.html'
      }
    },{
      state: 'project-details.challenges',
      config: {
        url: '/challengeEstimates',
        templateUrl: 'project-details/details-features/views/challenges.html',
        controller: 'ChallengesController',
        controllerAs: 'vm'
      }
    }
    ];
  }
})();
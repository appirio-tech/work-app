(function () {
  'use strict';

  angular.module('app.submit-work').run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'submit-work',
      config: {
        url: '/submit-work',
        title: 'Submit Work',
        abstract: true,
        templateUrl: 'submit-work/submit-work.html'
      }
    }, {
      state: 'submit-work.flow',
      config: {
        url: '',
        views: {
          'name': {
            templateUrl: 'submit-work/about-project/views/name.html',
            controller: 'SubmitNameController',
            controllerAs: 'vm'
          },
          'type': {
            templateUrl: 'submit-work/about-project/views/type.html',
            controller: 'SubmitTypeController',
            controllerAs: 'vm'
          },
          'brief': {
            templateUrl: 'submit-work/about-project/views/brief.html',
            controller: 'SubmitBriefController',
            controllerAs: 'vm'
          },
          'elevator-pitch': {
            templateUrl: 'submit-work/about-project/views/elevator-pitch.html',
            controller: 'SubmitElevatorPitchController',
            controllerAs: 'vm'
          },
          'competitors': {
            templateUrl: 'submit-work/about-project/views/competitors.html',
            controller: 'SubmitCompetitorsController',
            controllerAs: 'vm'
          },
          'users': {
            templateUrl: 'submit-work/users/views/users.html',
            controller: 'SubmitUsersController',
            controllerAs: 'vm'
          },
          'features': {
            templateUrl: 'submit-work/features/views/features.html',
            controller: 'SubmitFeaturesController',
            controllerAs: 'vm'
          }
        }
      }
    }];
  }
})();
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper, dataProvider) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'about-name',
        config: {
          url: '/submit-work/about/name',
          templateUrl: 'submit-work/about-project/views/name.html',
          controller: 'SubmitNameController',
          controllerAs: 'vm',
          title: 'Name',
          settings: {}
        }
      },
      {
        state: 'about-type',
        config: {
          url: '/submit-work/about/type',
          templateUrl: 'submit-work/about-project/views/type.html',
          controller: 'SubmitTypeController',
          controllerAs: 'vm',
          title: 'Type',
          settings: {}
        }
      },
      {
        state: 'about-brief',
        config: {
          url: '/submit-work/about/brief',
          templateUrl: 'submit-work/about-project/views/brief.html',
          controller: 'SubmitBriefController',
          controllerAs: 'vm',
          title: 'Brief',
          settings: {}
        }
      },
      {
        state: 'about-competitors',
        config: {
          url: '/submit-work/about/competitors',
          templateUrl: 'submit-work/about-project/views/competitors.html',
          controller: 'SubmitCompetitorsController',
          controllerAs: 'vm',
          title: 'Competitors',
          settings: {}
        }
      }
    ];
  }
})();

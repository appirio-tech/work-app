(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'users',
        config: {
          url: '/submit-work/users',
          templateUrl: 'submit-work/users/views/users.html',
          controller: 'SubmitUsersController',
          controllerAs: 'vm',
          title: 'Users',
          settings: {}
        }
      }
    ];
  }
})();

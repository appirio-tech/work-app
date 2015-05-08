(function () {
  'use strict';

  angular.module('app.auth').config(appStates);

  appStates.$inject = ['$stateProvider'];

  function appStates($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'auth/views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        data: {
          noAuthRequired: true
        }
      });
  }
})();


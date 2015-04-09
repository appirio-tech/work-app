(function () {
  'use strict';

  angular.module('app.auth').config(appStates);

  appStates.$inject = ['$stateProvider'];

  function appStates($stateProvider) {
    $stateProvider
      .state('logout', {
        url: '/logout',
        templateUrl: 'auth/views/logout.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }
})();


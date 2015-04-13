(function () {
  'use strict';

  angular.module('app', [
    'app.core',
    'app.layout',
    'app.getting-started',
    'app.auth',
    'app.submit-work',
    'app.create-account',
    'app.view-work',
    'app.demo',
    'app.user'
  ]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(false);
  }]);

})();

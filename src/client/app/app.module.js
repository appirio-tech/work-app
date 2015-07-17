(function () {
  'use strict';

  angular.module('app', [
    'app.core',
    'app.layout',
    'app.getting-started',
    'app.auth',
    'ap-file-upload',
    'app.submit-work',
    'app.manage',
    'appirio-tech-timeline',
    'appirio-tech-messaging',
    'appirio-tech-ng-auth',
    'ap-copilot-flow',
    'newrelic'
  ]).config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(false);

    $stateProvider.state('timeline', {
      url         : '/timeline/:workId',
      title       : 'Timeline',
      controller  : 'TimelineController',
      controllerAs: 'vm',
      templateUrl : 'views/timeline.html'
    });

    $stateProvider.state('messaging', {
      url         : '/messaging/:id',
      title       : 'Messaging',
      controller  : 'MessagingPageController',
      controllerAs: 'vm',
      templateUrl : 'views/messaging.html'
    });

  }]);


})();

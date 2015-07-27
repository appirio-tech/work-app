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
    'appirio-tech-ng-ui-components',
    'appirio-tech-submissions',
    'ap-copilot-flow',
    'newrelic'
  ]).config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true)

    $stateProvider.state('timeline', {
      url         : '/timeline/:workId',
      title       : 'Timeline',
      controller  : 'TimelineController',
      controllerAs: 'vm',
      templateUrl : 'views/timeline.html'
    });

    $stateProvider.state('messaging', {
      url         : '/messaging/:workId',
      title       : 'Messaging',
      controller  : 'MessagingPageController',
      controllerAs: 'vm',
      templateUrl : 'views/messaging.html'
    });

    $stateProvider.state('submissions', {
      url         : '/submissions',
      title       : 'Submissions',
      controller  : 'SubmissionsPageController',
      controllerAs: 'vm',
      templateUrl : 'views/submissions.html'
    });

    $stateProvider.state('submission-slides', {
      url         : '/submissions/slides',
      title       : 'Submissions Slides',
      controller  : 'SlidesDetailsPageController',
      controllerAs: 'vm',
      templateUrl : 'views/submission-slides.html'
    });

    $stateProvider.state('submission-details', {
      url         : '/submissions/details',
      title       : 'Submissions Details',
      controller  : 'SlidesDetailsPageController',
      controllerAs: 'vm',
      templateUrl : 'views/submission-details.html'
    });

  }]);


})();

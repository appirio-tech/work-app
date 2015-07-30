'use strict'

dependencies = [
  'app.core'
  'app.layout'
  'app.getting-started'
  'app.auth'
  'ap-file-upload'
  'app.submit-work'
  'app.manage'
  'appirio-tech-timeline'
  'appirio-tech-messaging'
  'appirio-tech-ng-auth'
  'appirio-tech-ng-ui-components'
  'appirio-tech-ng-projects'
  'appirio-tech-submissions'
  'ap-copilot-flow'
  'newrelic'
]

config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  states['timeline'] =
    url         : '/timeline/:workId'
    title       : 'Timeline'
    controller  : 'TimelineController'
    controllerAs: 'vm'
    templateUrl : 'views/timeline.html'

  states['messaging'] =
    url         : '/messaging/:workId'
    title       : 'Messaging'
    controller  : 'MessagingPageController'
    controllerAs: 'vm'
    templateUrl : 'views/messaging.html'

  states['submissions'] =
    url         : '/submissions'
    title       : 'Submissions'
    controller  : 'SubmissionsPageController'
    controllerAs: 'vm'
    templateUrl : 'views/submissions.html'

  states['submission-slides'] =
    url         : '/submissions/slides'
    title       : 'Submissions Slides'
    controller  : 'SlidesDetailsPageController'
    controllerAs: 'vm'
    templateUrl : 'views/submission-slides.html'

  states['submission-details'] =
    url         : '/submissions/details'
    title       : 'Submissions Details'
    controller  : 'SlidesDetailsPageController'
    controllerAs: 'vm'
    templateUrl : 'views/submission-details.html'

  states['manage'] =
    url         : '/submissions/details'
    title       : 'Submissions Details'
    controller  : 'SlidesDetailsPageController'
    controllerAs: 'vm'
    templateUrl : 'views/submission-details.html'

  states['view-work-multiple'] =
    url         : '/manage'
    templateUrl : 'views/manage.html'
    controller  : 'ManageController'
    controllerAs: 'vm'
    title       : 'View Work'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app', dependencies).config config


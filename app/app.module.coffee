'use strict'

dependencies = [
  'app.core'
  'app.layout'
  'app.getting-started'
  'app.auth'
  'ap-file-upload'
  'app.submit-work'
  'app.manage'
  'appirio-tech-ng-timeline'
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
    url         : '/work/:workId/timeline'
    title       : 'Timeline'
    controller  : 'TimelinePageController'
    controllerAs: 'vm'
    templateUrl : 'views/timeline.html'

  states['messaging'] =
    url         : '/messaging/:id'
    title       : 'Messaging'
    controller  : 'MessagingPageController'
    controllerAs: 'vm'
    templateUrl : 'views/messaging-copilot.html'

  states['submissions'] =
    url         : '/:workId/submissions/:phase'
    title       : 'Submissions'
    controller  : 'SubmissionsPageController'
    controllerAs: 'vm'
    templateUrl : 'views/submissions.html'

  states['submission-slides'] =
    url         : '/:workId/submissions/slides/:submissionId/:fileId'
    title       : 'Submissions Slides'
    controller  : 'SlidesDetailsPageController'
    controllerAs: 'vm'
    templateUrl : 'views/submission-slides.html'

  states['submission-detail'] =
    url         : '/:workId/submissions/detail/:submissionId'
    title       : 'Submissions Detail'
    controller  : 'SlidesDetailsPageController'
    controllerAs: 'vm'
    templateUrl : 'views/submission-detail.html'

  states['view-work-multiple'] =
    url         : '/manage'
    title       : 'View Work'
    controller  : 'ManageController'
    controllerAs: 'vm'
    templateUrl : 'views/manage.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app', dependencies).config config


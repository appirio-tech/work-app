'use strict'

dependencies = [
  'app.layout'
  'app.auth'
  'ap-file-upload'
  'appirio-tech-ng-timeline'
  'appirio-tech-messaging'
  'appirio-tech-ng-auth'
  'appirio-tech-ng-ui-components'
  'appirio-tech-ng-projects'
  'appirio-tech-ng-submit-work'
  'appirio-tech-submissions'
  'ap-copilot-flow'
  'newrelic'
]

config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  states['home'] =
    url        : '/'
    templateUrl: 'getting-started/views/getting-started.html'
    title      : 'Getting Started'
    data:
      noAuthRequired: true

  states['timeline'] =
    url         : '/work/:workId/timeline'
    title       : 'Timeline'
    controller  : 'TimelinePageController as vm'
    templateUrl : 'views/timeline.html'

  states['messaging'] =
    url         : '/messaging/:id'
    title       : 'Messaging'
    controller  : 'MessagingPageController as vm'
    templateUrl : 'views/messaging-copilot.html'

  states['submissions'] =
    url         : '/:workId/submissions/:phase'
    title       : 'Submissions'
    controller  : 'SubmissionsPageController as vm'
    templateUrl : 'views/submissions.html'

  states['submission-slides'] =
    url         : '/:workId/submissions/slides/:submissionId/:fileId'
    title       : 'Submissions Slides'
    controller  : 'SlidesDetailsPageController as vm'
    templateUrl : 'views/submission-slides.html'

  states['submission-detail'] =
    url         : '/:workId/submissions/detail/:submissionId'
    title       : 'Submissions Detail'
    controller  : 'SlidesDetailsPageController as vm'
    templateUrl : 'views/submission-detail.html'

  states['view-work-multiple'] =
    url         : '/manage'
    title       : 'View Work'
    controller  : 'ManageController as vm'
    templateUrl : 'views/manage.html'

  states['submit-work'] =
    url         : '/submit-work/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work.html'

  states['verified-email-address'] =
    url        : '/verified-email-address'
    templateUrl: 'views/verified-email-address.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app', dependencies).config config


'use strict'

config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  states['home'] =
    url        : '/'
    templateUrl: 'getting-started/views/getting-started.html'
    title      : 'Getting Started'

  states['timeline'] =
    url         : '/work/:workId/timeline'
    title       : 'Timeline'
    controller  : 'TimelinePageController as vm'
    templateUrl : 'views/timeline.html'
    persmission:
      groups: ['any']

  states['messaging'] =
    url         : '/messaging/:id'
    title       : 'Messaging'
    controller  : 'MessagingPageController as vm'
    templateUrl : 'views/messaging-copilot.html'
    persmission:
      groups: ['any']

  states['submissions'] =
    url         : '/project/:workId/submissions/:phase'
    templateUrl : 'views/submissions.html'
    controller: 'SubmissionsPageController as vm'
    persmission:
      groups: ['any']

  states['final-fixes'] =
    url         : '/project/:workId/submissions/final-fixes'
    templateUrl : 'views/submissions.html'
    controller: 'FinalFixesController as vm'
    persmission:
      groups: ['any']

  states['submission-detail'] =
    url         : '/project/:workId/submissions/:submissionId/detail'
    templateUrl : 'views/submission-detail.html'
    controller: 'SubmissionDetailsPageController as vm'
    persmission:
      groups: ['any']

  states['submission-slides'] =
    url         : '/project/:workId/submissions/:submissionId/slides/:fileId'
    templateUrl : 'views/submission-slides.html'
    controller: 'SlidesPageController as vm'
    persmission:
      groups: ['any']

  states['view-work-multiple'] =
    url         : '/manage'
    title       : 'View Work'
    controller  : 'ManageController as vm'
    templateUrl : 'views/manage.html'
    persmission:
      groups: ['any']

  states['submit-work'] =
    url         : '/submit-work/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work.html'
    persmission:
      groups: ['any']

  states['verified-email-address'] =
    url        : '/verified-email-address'
    templateUrl: 'views/verified-email-address.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app').config config
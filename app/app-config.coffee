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
    url        : '/projects/:projectId/submissions'
    templateUrl: 'views/submissions-generic.html'
    controller : 'GenericSubmissionsPageController as vm'
    persmission:
      groups: ['any']

  states['design-concepts'] =
    url        : '/projects/:projectId/:stepId/design-concepts'
    templateUrl: 'views/submissions.html'
    controller : 'SubmissionsPageController as vm'
    stepType   : 'designConcepts'
    persmission:
      groups: ['any']

  states['complete-designs'] =
    url        : '/projects/:projectId/:stepId/complete-designs'
    templateUrl: 'views/submissions.html'
    controller : 'SubmissionsPageController as vm'
    stepType   : 'completeDesigns'
    persmission:
      groups: ['any']

  states['final-fixes'] =
    url        : '/projects/:projectId/:stepId/final-fixes'
    templateUrl: 'views/final-fixes.html'
    controller : 'FinalFixesPageController as vm'
    persmission:
      groups: ['any']

  states['submission-detail'] =
    url        : '/projects/:projectId/:stepId/:submissionId'
    templateUrl: 'views/submission-detail.html'
    controller : 'SubmissionDetailPageController as vm'
    persmission:
      groups: ['any']

  states['file-detail'] =
    url        : '/projects/:projectId/:stepId/:submissionId/:fileId?modal'
    templateUrl: 'views/file-detail.html'
    controller : 'FileDetailPageController as vm'
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

  states['submit-work-features'] =
    url         : '/submit-work/features/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work-features.html'
    persmission:
      groups: ['any']

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work-visuals.html'
    persmission:
      groups: ['any']

  states['submit-work-development'] =
    url         : '/submit-work/development/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work-development.html'
    persmission:
      groups: ['any']

  states['verified-email-address'] =
    url        : '/verified-email-address'
    templateUrl: 'views/verified-email-address.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app').config config
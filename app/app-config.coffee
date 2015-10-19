'use strict'

config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  states['home'] =
    url        : '/'
    title       : 'View Work'
    controller  : 'ManageController as vm'
    templateUrl : 'views/manage.html'

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
    url        : '/projects/:projectId/submissions'
    templateUrl: 'views/submissions-generic.html'
    controller : 'GenericSubmissionsPageController as vm'

  states['design-concepts'] =
    url        : '/projects/:projectId/:stepId/design-concepts'
    templateUrl: 'views/submissions.html'
    controller : 'SubmissionsPageController as vm'
    stepType   : 'designConcepts'

  states['complete-designs'] =
    url        : '/projects/:projectId/:stepId/complete-designs'
    templateUrl: 'views/submissions.html'
    controller : 'SubmissionsPageController as vm'
    stepType   : 'completeDesigns'

  states['final-fixes'] =
    url        : '/projects/:projectId/:stepId/final-fixes'
    templateUrl: 'views/final-fixes.html'
    controller : 'FinalFixesPageController as vm'

  states['submission-detail'] =
    url        : '/projects/:projectId/:stepId/:submissionId'
    templateUrl: 'views/submission-detail.html'
    controller : 'SubmissionDetailPageController as vm'

  states['file-detail'] =
    url        : '/projects/:projectId/:stepId/:submissionId/:fileId?modal'
    templateUrl: 'views/file-detail.html'
    controller : 'FileDetailPageController as vm'

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

  states['submit-work-features'] =
    url         : '/submit-work/features/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work-features.html'

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work-visuals.html'

  states['submit-work-development'] =
    url         : '/submit-work/development/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work-development.html'

  states['submit-work-complete'] =
    url         : '/submit-work/complete/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    templateUrl : 'views/submit-work-complete.html'

  states['verified-email-address'] =
    url        : '/verified-email-address'
    templateUrl: 'views/verified-email-address.html'
    data:
      public: true

  states['otherwise'] =
    url        : '*path',
    templateUrl: 'views/404.html'
    data:
      public: true

  for key, state of states
    unless state.data?.public
      state.data = state.data || {}
      state.data.requiresLogin = true

    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app').config config


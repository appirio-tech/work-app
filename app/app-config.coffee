'use strict'

config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  # customer routes

  states['home'] =
    url         : '/'
    title       : 'View Work'
    controller  : 'CustomerProjectsController as vm'
    templateUrl : 'views/customer/projects.html'

  states['timeline'] =
    url         : '/customer/projects/:workId/timeline'
    title       : 'Timeline'
    controller  : 'TimelinePageController as vm'
    templateUrl : 'views/timeline.html'

  states['messaging'] =
    url         : '/customer/projects/:id/messaging/thread/:threadId'
    title       : 'Messaging'
    controller  : 'MessagingPageController as vm'
    templateUrl : 'views/customer/messaging.html'

  states['view-work-multiple'] =
    url         : '/customer/projects'
    title       : 'View Work'
    controller  : 'CustomerProjectsController as vm'
    templateUrl : 'views/customer/projects.html'

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

  states['project-details'] =
    url         : '/customer/projects/:id/details'
    title       : 'Project Details'
    controller  : 'CustomerProjectDetailsPageController as vm'
    templateUrl : 'views/customer/project-details.html'

  # copilot routes
  states['copilot-projects'] =
    url         : '/copilot/projects'
    title       : 'My Projects'
    controller  : 'CopilotProjectsController as vm'
    templateUrl : 'views/copilot/copilot-projects.html'
    rolesAllowed: [ 'copilot' ]

  states['copilot-open-projects'] =
    url         : '/copilot/open-projects'
    title       : 'Available Projects'
    controller  : 'CopilotOpenProjectsController as vm'
    templateUrl : 'views/copilot/open-projects.html'
    rolesAllowed: [ 'copilot' ]

  states['copilot-messaging'] =
    url         : '/copilot/projects/:id/messaging/thread/:threadId'
    title       : 'Copilot Messaging'
    controller  : 'MessagingPageController as vm'
    templateUrl : 'views/copilot/copilot-messaging.html'
    rolesAllowed: [ 'copilot' ]

  states['copilot-submission'] =
    url         : '/copilot/projects/:id/submissions'
    title       : 'Copilot Submission'
    controller  : 'GenericSubmissionsPageController as vm'
    templateUrl : 'views/submissions-generic.html'
    rolesAllowed: [ 'copilot' ]

  states['copilot-project-details'] =
    url         : '/copilot/projects/:id/details'
    title       : 'Project Details'
    controller  : 'CopilotProjectDetailsPageController as vm'
    templateUrl : 'views/copilot/copilot-project-details.html'
    rolesAllowed: [ 'copilot' ]

  # Shared routes
  states['step'] =
    url        : '/projects/:projectId/steps/:stepId'
    templateUrl: 'views/step.html'
    controller : 'StepController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member' ]

  states['submission-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId'
    templateUrl: 'views/submission-detail.html'
    controller : 'SubmissionDetailPageController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member' ]

  states['file-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId/files/:fileId?modal'
    templateUrl: 'views/file-detail.html'
    controller : 'FileDetailPageController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member' ]

  # general routes
  states['login'] =
    url: '/login'
    templateUrl: 'auth/views/login.html'
    controller: 'LoginController as vm'
    public: true

  states['register'] =
    url: '/register'
    templateUrl: 'auth/views/register.html'
    controller: 'RegisterController as vm'
    public: true

  states['forbidden'] =
    url: '/403',
    templateUrl: 'views/403.html'
    public: true

  # This must be the last one in the list
  states['otherwise'] =
    url: '*path',
    templateUrl: 'views/404.html'
    public: true

  for key, state of states
    unless state.rolesAllowed
      state.rolesAllowed = [ 'customer' ]

    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app').config config


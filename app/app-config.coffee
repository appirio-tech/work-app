require './scripts/basic.controller.coffee'
require './scripts/messaging.controller.coffee'
require './scripts/submissions-pages.controller.coffee'

config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  # customer routes

  states['home'] =
    url         : '/'
    title       : 'View Work'
    controller  : 'BasicController as vm'
    template    : require('./views/projects.jade')()

  states['timeline'] =
    url         : '/projects/:workId/timeline'
    title       : 'Timeline'
    controller  : 'BasicController as vm'
    template    : require('./views/timeline.jade')()

  states['messaging'] =
    url         : '/projects/:id/messaging/thread/:threadId'
    title       : 'Messaging'
    controller  : 'MessagingPageController as vm'
    template    : require('./views/messaging.jade')()

  states['project-search'] =
    url         : '/projects'
    title       : 'View Work'
    controller  : 'BasicController as vm'
    template    : require('./views/projects.jade')()

  states['submit-work'] =
    url         : '/submit-work/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work.jade')()

  states['submit-work-features'] =
    url         : '/submit-work/features/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-features.jade')()

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-visuals.jade')()

  states['submit-work-development'] =
    url         : '/submit-work/development/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-development.jade')()

  states['submit-work-upload-requirements'] =
    url         : '/submit-work/upload-requirements/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-upload-requirements.jade')()

  states['submit-work-complete'] =
    url         : '/submit-work/complete/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-complete.jade')()

  states['project-details'] =
    url         : '/projects/:id/details'
    title       : 'Project Details'
    controller  : 'BasicController as vm'
    template    : require('./views/project-details.jade')()

  # copilot routes
  states['copilot-projects'] =
    url         : '/copilot/projects'
    title       : 'My Projects'
    controller  : 'BasicController as vm'
    template    : require('./views/projects.jade')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-messaging'] =
    url         : '/copilot/projects/:id/messaging/thread/:threadId'
    title       : 'Copilot Messaging'
    controller  : 'MessagingPageController as vm'
    template    : require('./views/messaging.jade')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-project-details'] =
    url         : '/copilot/projects/:id/details'
    title       : 'Project Details'
    controller  : 'BasicController as vm'
    template    : require('./views/project-details.jade')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-status-reports'] =
    url         : '/status-reports/:id/steps/:stepId'
    title       : 'Status Reports'
    controller  : 'BasicController as vm'
    template    : require('./views/status-reports.jade')()
    rolesAllowed: [ 'copilot', 'admin' ]

  states['copilot-status-report-details'] =
    url         : '/status-reports/:id/report/:reportId'
    title       : 'Status Report Details'
    controller  : 'BasicController as vm'
    template    : require('./views/status-report-detail.jade')()
    rolesAllowed: [ 'copilot', 'admin' ]

  states['copilot-manage-steps'] =
    url         : '/manage-steps/:projectId'
    title       : 'Status Report Details'
    controller  : 'BasicController as vm'
    template    : require('./views/manage-steps.jade')()
    rolesAllowed: [ 'copilot', 'admin' ]

  # Shared routes

  resolveProject = (ProjectsAPIService, $stateParams) ->
    ProjectsAPIService.get({id: $stateParams.projectId}).$promise

  resolveProject.$inject = ['ProjectsAPIService', '$stateParams']

  states['step'] =
    url        : '/projects/:projectId/steps/:stepId'
    template   : require('./views/step.jade')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  states['current-step'] =
    url        : '/projects/:projectId/current-step'
    template   : require('./views/step.jade')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  states['submission-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId'
    template   : require('./views/submission-detail.jade')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  states['file-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId/files/:fileId?modal'
    template   : require('./views/file-detail.jade')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  # general routes

  states['forbidden'] =
    url: '/403',
    template   : require('./views/403.jade')()
    controller: 'BasicController as vm'
    public: true

  # This must be the last one in the list
  states['otherwise'] =
    url: '*path',
    template   : require('./views/404.jade')()
    public: true

  for key, state of states
    unless state.rolesAllowed
      state.rolesAllowed = [ 'customer', 'copilot', 'admin' ]

    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app').config config


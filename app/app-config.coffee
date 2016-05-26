require './scripts/basic.controller.coffee'
require './scripts/messaging.controller.coffee'
require './scripts/submissions-pages.controller.coffee'
require './scripts/manage-steps.directive.coffee'

config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  # customer routes

  states['home'] =
    url         : '/'
    title       : 'View Work'
    controller  : 'BasicController as vm'
    template    : require('./views/projects')()

  states['timeline'] =
    url         : '/projects/:workId/timeline'
    title       : 'Timeline'
    controller  : 'BasicController as vm'
    template    : require('./views/timeline')()

  states['messaging'] =
    url         : '/projects/:id/messaging/thread/:threadId'
    title       : 'Messaging'
    controller  : 'MessagingPageController as vm'
    template    : require('./views/messaging')()

  states['view-work-multiple'] =
    url         : '/projects'
    title       : 'View Work'
    controller  : 'BasicController as vm'
    template    : require('./views/projects')()

  states['submit-work'] =
    url         : '/submit-work/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work')()

  states['submit-work-features'] =
    url         : '/submit-work/features/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-features')()

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-visuals')()

  states['submit-work-development'] =
    url         : '/submit-work/development/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-development')()

  states['submit-work-upload-requirements'] =
    url         : '/submit-work/upload-requirements/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-upload-requirements')()

  states['submit-work-complete'] =
    url         : '/submit-work/complete/:id'
    title       : 'Submit Work'
    controller  : 'BasicController as vm'
    template    : require('./views/submit-work-complete')()

  states['verified-email-address'] =
    url        : '/verified-email-address'
    template   : require('./views/verified-email-address')()

  states['terms'] =
    url         : '/terms'
    title       : 'Terms'
    template    : require('./views/terms')()

  states['project-details'] =
    url         : '/projects/:id/details'
    title       : 'Project Details'
    controller  : 'BasicController as vm'
    template    : require('./views/project-details')()

  # copilot routes
  states['copilot-projects'] =
    url         : '/copilot/projects'
    title       : 'My Projects'
    controller  : 'BasicController as vm'
    template    : require('./views/projects')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-open-projects'] =
    url         : '/open-projects'
    title       : 'Available Projects'
    controller  : 'BasicController as vm'
    template    : require('./views/open-projects')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-messaging'] =
    url         : '/copilot/projects/:id/messaging/thread/:threadId'
    title       : 'Copilot Messaging'
    controller  : 'MessagingPageController as vm'
    template    : require('./views/messaging')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-project-details'] =
    url         : '/copilot/projects/:id/details'
    title       : 'Project Details'
    controller  : 'BasicController as vm'
    template    : require('./views/project-details')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-status-reports'] =
    url         : '/status-reports/:id/steps/:stepId'
    title       : 'Status Reports'
    controller  : 'BasicController as vm'
    template    : require('./views/status-reports')()
    rolesAllowed: [ 'copilot', 'admin' ]

  states['copilot-status-report-details'] =
    url         : '/status-reports/:id/report/:reportId'
    title       : 'Status Report Details'
    controller  : 'BasicController as vm'
    template    : require('./views/status-report-detail')()
    rolesAllowed: [ 'copilot', 'admin' ]

  states['copilot-manage-steps'] =
    url         : '/manage-steps/:projectId'
    title       : 'Status Report Details'
    controller  : 'BasicController as vm'
    template    : require('./views/manage-steps')()
    rolesAllowed: [ 'copilot', 'admin' ]

  # Shared routes

  resolveProject = (ProjectsAPIService, $stateParams) ->
    ProjectsAPIService.get({id: $stateParams.projectId}).$promise

  resolveProject.$inject = ['ProjectsAPIService', '$stateParams']

  states['step'] =
    url        : '/projects/:projectId/steps/:stepId'
    template   : require('./views/step')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  states['current-step'] =
    url        : '/projects/:projectId/current-step'
    template   : require('./views/step')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  states['submission-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId'
    template   : require('./views/submission-detail')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  states['file-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId/files/:fileId?modal'
    template   : require('./views/file-detail')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member', 'admin' ]
    resolve:
      project: resolveProject

  # general routes

  states['forbidden'] =
    url: '/403',
    template   : require('./views/403')()
    controller: 'BasicController as vm'
    public: true

  # This must be the last one in the list
  states['otherwise'] =
    url: '*path',
    template   : require('./views/404')()
    public: true

  for key, state of states
    unless state.rolesAllowed
      state.rolesAllowed = [ 'customer', 'copilot', 'admin' ]

    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app').config config


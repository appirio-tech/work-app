config = ($locationProvider, $stateProvider) ->
  states = {}

  $locationProvider.html5Mode true

  # customer routes

  states['home'] =
    url         : '/'
    title       : 'View Work'
    controller  : 'CustomerProjectsController as vm'
    template    : require('./views/customer/projects')()

  states['timeline'] =
    url         : '/customer/projects/:workId/timeline'
    title       : 'Timeline'
    controller  : 'TimelinePageController as vm'
    template    : require('./views/timeline')()

  states['messaging'] =
    url         : '/customer/projects/:id/messaging/thread/:threadId'
    title       : 'Messaging'
    controller  : 'MessagingPageController as vm'
    template    : require('./views/customer/messaging')()

  states['view-work-multiple'] =
    url         : '/customer/projects'
    title       : 'View Work'
    controller  : 'CustomerProjectsController as vm'
    template    : require('./views/customer/projects')()

  states['submit-work'] =
    url         : '/submit-work/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    template    : require('./views/submit-work')()

  states['submit-work-features'] =
    url         : '/submit-work/features/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    template    : require('./views/submit-work-features')()

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    template    : require('./views/submit-work-visuals')()

  states['submit-work-development'] =
    url         : '/submit-work/development/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    template    : require('./views/submit-work-development')()

  states['submit-work-complete'] =
    url         : '/submit-work/complete/:id'
    title       : 'Submit Work'
    controller  : 'SubmitWorkPageController as vm'
    template    : require('./views/submit-work-complete')()

  states['verified-email-address'] =
    url        : '/verified-email-address'
    template   : require('./views/verified-email-address')()

  states['project-details'] =
    url         : '/customer/projects/:id/details'
    title       : 'Project Details'
    controller  : 'CustomerProjectDetailsPageController as vm'
    template    : require('./views/customer/project-details')()

  # copilot routes
  states['copilot-projects'] =
    url         : '/copilot/projects'
    title       : 'My Projects'
    controller  : 'CopilotProjectsController as vm'
    template    : require('./views/copilot/copilot-projects')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-open-projects'] =
    url         : '/copilot/open-projects'
    title       : 'Available Projects'
    controller  : 'CopilotOpenProjectsController as vm'
    template    : require('./views/copilot/open-projects')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-messaging'] =
    url         : '/copilot/projects/:id/messaging/thread/:threadId'
    title       : 'Copilot Messaging'
    controller  : 'MessagingPageController as vm'
    template    : require('./views/copilot/copilot-messaging')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-project-details'] =
    url         : '/copilot/projects/:id/details'
    title       : 'Project Details'
    controller  : 'CopilotProjectDetailsPageController as vm'
    template    : require('./views/copilot/copilot-project-details')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-status-reports'] =
    url         : '/copilot/status-reports/:id/steps/:stepId'
    title       : 'Status Reports'
    controller  : 'StatusReportsController as vm'
    template    : require('./views/copilot/status-reports')()
    rolesAllowed: [ 'copilot' ]

  states['copilot-status-report-details'] =
    url         : '/copilot/status-reports/:id/report/:reportId'
    title       : 'Status Report Details'
    controller  : 'StatusReportDetailsController as vm'
    template    : require('./views/copilot/status-report-details')()
    rolesAllowed: [ 'copilot' ]

  # Shared routes

  resolveProject = (ProjectsAPIService, $stateParams) ->
    ProjectsAPIService.get({id: $stateParams.projectId}).$promise

  states['step'] =
    url        : '/projects/:projectId/steps/:stepId'
    template   : require('./views/step')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member' ]
    resolve:
      project: resolveProject

  # Shared routes
  states['current-step'] =
    url        : '/projects/:projectId/current-step'
    template   : require('./views/step')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member' ]
    resolve:
      project: resolveProject

  states['submission-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId'
    template   : require('./views/submission-detail')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member' ]
    resolve:
      project: resolveProject

  states['file-detail'] =
    url        : '/projects/:projectId/steps/:stepId/submissions/:submissionId/files/:fileId?modal'
    template   : require('./views/file-detail')()
    controller : 'SubmissionsPagesController as vm'
    rolesAllowed: [ 'customer', 'copilot', 'member' ]
    resolve:
      project: resolveProject

  # general routes
  states['login'] =
    url: '/login?activated'
    template: require('./views/login-reg/login')()
    public: true

  states['register'] =
    url: '/registration'
    template   : require('./views/login-reg/registration')()
    public: true

  states['registration-success'] =
    url: '/registration-success'
    template   : require('./views/login-reg/registration-success')()
    public: true

  states['SSO_LOGIN'] =
    url: '/sso-login/:org'
    template   : require('./views/login-reg/sso-login')()
    controller : 'SSOLoginPageController as vm'
    public: true

  states['SSO_CALLBACK'] =
    url: '/sso-callback?userJWTToken&status&message'
    template   : require('./views/login-reg/sso-callback')()
    controller : 'SSOCallbackPageController as vm'
    public: true

  states['FORGOT_PASSWORD'] =
    url: '/forgot-password'
    template   : require('./views/login-reg/forgot-password')()
    public: true

  states['RESET_PASSWORD'] =
    url: '/reset-password?token&handle'
    template   : require('./views/login-reg/reset-password')()
    public: true

  states['forbidden'] =
    url: '/403',
    template   : require('./views/403')()
    controller: '403Controller as vm'
    public: true

  # This must be the last one in the list
  states['otherwise'] =
    url: '*path',
    template   : require('./views/404')()
    public: true

  for key, state of states
    unless state.rolesAllowed
      state.rolesAllowed = [ 'customer' ]

    $stateProvider.state key, state

config.$inject = ['$locationProvider', '$stateProvider']

angular.module('app').config config


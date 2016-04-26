'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/copilots/:userId/projects/:projectId/approved'

  params =
    userId: '@userId'
    projectId: '@projectId'

  methods =
    post:
      method           :'POST'
      isArray          : false
      transformResponse: transform

  $resource url, {}, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('appirio-tech-ng-api-services').factory 'CopilotApprovalAPIService', srv
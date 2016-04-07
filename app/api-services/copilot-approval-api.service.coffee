'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/copilots/:userId/projects/:projectId/approved'

  params =
    userId: '@userId'
    projectId: '@projectId'

  methods =
    post:
      method           :'POST'
      isArray          : false
      transformResponse: transform

  $resource url, {}, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'CopilotApprovalAPIService', srv
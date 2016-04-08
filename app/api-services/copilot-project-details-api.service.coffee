'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/copilots/:userId/projects/:projectId'

  params =
    userId: '@userId'
    projectId: '@projectId'

  methods =
    query:
      method           :'GET'
      isArray          : true
      transformResponse: transform
    put:
      method           :'PUT'
      isArray          : false
      transformResponse: transform
    post:
      method           :'POST'
      isArray          : false
      transformResponse: transform

  $resource url, {}, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'CopilotProjectDetailsAPIService', srv
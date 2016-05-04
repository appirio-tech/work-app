'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/work/:id/copilot'

  params =
    id: '@id'
    copilotId: '@copilotId'

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

  $resource url, params, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'CopilotProjectDetailsAPIService', srv
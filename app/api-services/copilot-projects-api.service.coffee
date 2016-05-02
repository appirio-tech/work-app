'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/work/:workId'

  params =
    workId: '@workId'

  methods =
    query:
      method           :'GET'
      isArray          : true
      transformResponse: transform
    get:
      method           :'GET'
      isArray          : false
      transformResponse: transform

  $resource url, {}, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'CopilotProjectsAPIService', srv
'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/work/:workId'

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

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'CopilotProjectsAPIService', srv
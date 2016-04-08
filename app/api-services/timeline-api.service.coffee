'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/projects/:workId/timeline'

  params =
    workId: '@workId'

  methods =
    query:
      method           : 'GET'
      isArray          : true
      transformResponse: transform

    get:
      method           : 'GET'
      isArray          : false
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'TimelineAPIService', srv

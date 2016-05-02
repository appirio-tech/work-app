'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/projects/:workId/timeline'

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

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'TimelineAPIService', srv

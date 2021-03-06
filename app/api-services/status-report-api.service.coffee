'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/report/:workId/steps/:stepId'

  params =
    workId: '@workId'
    stepId: '@stepId'

  methods =
    get:
      method: 'GET'
      transformResponse: transform

    query:
      method: 'GET'
      isArray: true
      transformResponse: transform

    post:
      method: 'POST'
      transformResponse: transform

    patch:
      method: 'PATCH'
      transformResponse: transform

    put:
      method: 'PUT'
      transformResponse: transform

  $resource url, {}, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'StatusReportAPIService', srv
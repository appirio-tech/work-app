'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/report/:workId/status-reports'

  params =
    workId: '@workId'

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

angular.module('appirio-tech-ng-api-services').factory 'StatusReportCollectionAPIService', srv
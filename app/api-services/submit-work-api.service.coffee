'use strict'

{ transform } = require './transform.js'

transformIdOnlyResponse = (response) ->
  parsed = transform(response)

  id: parsed

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/work/:id'

  params =
    id: '@id'

  methods =
    put:
      method           :'PUT'
      transformResponse: transformIdOnlyResponse

    post:
      method           :'POST'
      transformResponse: transformIdOnlyResponse

    get:
      transformResponse: transform

    query:
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('appirio-tech-ng-api-services').factory 'SubmitWorkAPIService', srv
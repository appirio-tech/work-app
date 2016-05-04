'use strict'

{ transform } = require './transform.js'

transformIdOnlyResponse = (response) ->
  parsed = transform(response)

  id: parsed

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/work/:id/estimates'

  params =
    id: '@id'

  methods =
    post:
      method           :'POST'
      transformResponse: transformIdOnlyResponse

  $resource url, params, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'ProjectEstimatesAPIService', srv
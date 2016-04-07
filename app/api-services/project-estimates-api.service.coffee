'use strict'

transform = require './transform.js'

transformIdOnlyResponse = (response) ->
  parsed = transform(response)

  id: parsed

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/projects/:id/estimates'

  params =
    id: '@id'

  methods =
    post:
      method           :'POST'
      transformResponse: transformIdOnlyResponse

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'ProjectEstimatesAPIService', srv
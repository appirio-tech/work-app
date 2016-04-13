'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/work/:id/upsell'

  params =
    id:    '@id'

  methods =
    post:
      method: 'POST'
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'UpsellAPIService', srv
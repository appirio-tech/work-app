'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/work/:id/upsell'

  params =
    id:    '@id'

  methods =
    post:
      method: 'POST'
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('appirio-tech-ng-api-services').factory 'UpsellAPIService', srv
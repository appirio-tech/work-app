'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/work/:id/launch'

  params =
    id: '@id'

  methods =
    post:
      method           :'POST'
      isArray          : false
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'LaunchProjectAPIService', srv
'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/work/:id'

  params =
    id: '@id'

  methods =
    put:
      method           :'PUT'
      isArray          : false
      transformResponse: transform

    get:
      method           :'GET'
      isArray          : true
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'WorkAPIService', srv

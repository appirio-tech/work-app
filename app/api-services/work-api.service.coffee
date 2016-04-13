'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/work/:id'

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

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'WorkAPIService', srv

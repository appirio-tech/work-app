'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/profiles/:id'

  params =
    id: '@id'

  actions =
    get:
      method           :'GET'
      isArray          : false
      transformResponse: transform

   $resource url, params, actions

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'profilesAPIService', srv
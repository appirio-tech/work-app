'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/threads/:id'

  params  =
    id          : '@id'
    subscriberId: '@subscriberId'

  actions =
    query:
      method           :'GET'
      isArray          : false
      transformResponse: transform
    get:
      method           :'GET'
      isArray          : false
      transformResponse: transform

  $resource url, params, actions

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'ThreadsAPIService', srv

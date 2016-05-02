'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/threads/:id'

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

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'ThreadsAPIService', srv

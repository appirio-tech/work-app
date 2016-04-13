'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/projects/:id'

  params =
    id: '@id'

  methods =
    put:
      method           :'PUT'
      transformResponse: transform

    post:
      method           :'POST'
      transformResponse: transform

    get:
      transformResponse: transform

    query:
      isArray: true
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'ProjectsAPIService', srv
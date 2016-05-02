'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/projects/:id'

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

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'ProjectsAPIService', srv
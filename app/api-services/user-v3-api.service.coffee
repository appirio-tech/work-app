'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/users/:id'

  params =
    id: '@id'

  actions =
    get:
      method           :'GET'
      isArray          : false
      transformResponse: transform

    post:
      method: 'POST'

   $resource url, params, actions

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('appirio-tech-ng-api-services').factory 'UserV3APIService', srv
'use strict'

srv = ($resource, API_URL) ->
  url     = API_URL + '/v3/authorizations/:id'
  params  = id: '@id'

  $resource url, params

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'AuthorizationsAPIService', srv

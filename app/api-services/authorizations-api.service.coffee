'use strict'

srv = ($resource, WORK_API_URL) ->
  url     = WORK_API_URL + '/authorizations/:id'
  params  = id: '@id'

  $resource url, params

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('appirio-tech-ng-api-services').factory 'AuthorizationsAPIService', srv

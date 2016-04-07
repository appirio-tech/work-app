'use strict'

transform = require './transform.js'

transformRequest = (data) ->
  transformedData =
    param: data

  JSON.stringify transformedData

confirmRanks = (data) ->
  if data?.hasOwnProperty 'customerConfirmedRanks'
    customerConfirmedRanks = data.customerConfirmedRanks
  else
    customerConfirmedRanks = data

  transformedData =
    param:
      details:
        customerConfirmedRanks: customerConfirmedRanks

  JSON.stringify transformedData

acceptFixes = (data) ->
  if data?.hasOwnProperty 'customerAcceptedFixes'
    customerAcceptedFixes = data.customerAcceptedFixes
  else
    customerAcceptedFixes = data

  transformedData =
    param:
      details:
        customerAcceptedFixes: customerAcceptedFixes

  JSON.stringify transformedData

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/projects/:projectId/steps/:stepId'

  params =
    projectId: '@projectId'
    stepId   : '@stepId'

  methods =
    get:
      transformResponse: transform
    query:
      transformResponse: transform
      isArray          : true
    patch:
      method: 'PATCH'
      transformRequest : transformRequest
      transformResponse: transform

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'StepsAPIService', srv
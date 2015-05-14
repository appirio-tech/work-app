'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || []

srv = ($resource, apiUrl) ->
  url     = apiUrl + 'events'
  params  = filter: '@filter'
  actions =
    query:
      method           :'GET'
      isArray          : true
      transformResponse: transformResponse

  $resource url, params, actions

srv.$inject = ['$resource', 'apiUrl']

angular.module('app.timeline').factory 'TimelineAPIService', srv

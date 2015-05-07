# grunt replace:development
'use strict'

transformResponse = (response) ->
  parsed = JSON.parse(response)
  parsed

srv = ($resource, apiUrl) ->
  url     = apiUrl + 'events'
  params  = filter: 'sourceObjectId%3D@workId'
  actions =
    query:
      method           :'GET'
      isArray          : false
      transformResponse: transformResponse

  $resource url, params, actions

srv.$inject = ['$resource', 'apiUrl']

angular.module('app.timeline').factory 'TimelineAPI', srv

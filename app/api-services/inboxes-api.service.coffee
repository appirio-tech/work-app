'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/inboxes/:threadId'

  params =
    threadId:    '@threadId'

  methods =
    get:
      method: 'GET'
      transformResponse: transform

    post:
      method: 'POST'
      transformResponse: transform

    patch:
      method: 'PATCH'
      transformResponse: transform

    put:
      method: 'PUT'
      transformResponse: transform

  $resource url, {}, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'InboxesAPIService', srv
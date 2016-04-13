'use strict'

transform = require './transform.js'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/inboxes/project'

  methods =
    get:
      method: 'GET'
      transformResponse: transform

    query:
      method: 'GET'
      isArray: true
      transformResponse: transform


  $resource url, {}, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'InboxesProjectAPIService', srv
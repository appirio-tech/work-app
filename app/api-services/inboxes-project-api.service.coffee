'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/inboxes/project'

  methods =
    get:
      method: 'GET'
      transformResponse: transform

    query:
      method: 'GET'
      isArray: true
      transformResponse: transform


  $resource url, {}, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('appirio-tech-ng-api-services').factory 'InboxesProjectAPIService', srv
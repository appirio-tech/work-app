'use strict'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/messages/:id'

  params =
    id: '@id'

  methods =
    post:
      method: 'POST'

    patch:
      method: 'PATCH'

    put:
      method: 'PUT'

  $resource url, {}, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('api-services').factory 'MessagesAPIService', srv

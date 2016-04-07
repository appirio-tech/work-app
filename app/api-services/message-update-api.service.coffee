'use strict'

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/inboxes/:threadId/messages/:messageId'

  params =
    threadId:    '@threadId'
    messageId: '@messageId'

  methods =
    post:
      method: 'POST'

    patch:
      method: 'PATCH'

    put:
      method: 'PUT'

  $resource url, {}, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-api-services').factory 'MessageUpdateAPIService', srv
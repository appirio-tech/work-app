'use strict'

srv = (TimelineAPIService) ->
  getEvents = (params, onSuccess) ->
    resource = TimelineAPIService.query params

    resource.$promise.then (response) ->
      submittedDate = getCreatedAt 'submitted', response
      quotedDate    = getCreatedAt 'quote-created', response
      coPilotedDate = getCreatedAt 'copilot-assigned', response

      timeline =
        events       : response
        submittedDate: submittedDate
        quotedDate   : quotedDate
        coPilotedDate: coPilotedDate

      onSuccess? timeline

    resource.$promise.catch ->
      # need handle error

    resource.$promise.finally ->
      # need handle finally

  findEvent = (type, events) ->
    for e in events
      return e if e.eventSubType == type

    false

  getCreatedAt = (type, events) ->
    e = findEvent type, events
    e?.createdAt

  getEvents: getEvents

srv.$inject = ['TimelineAPIService']

angular.module('app.timeline').factory 'TimelineService', srv

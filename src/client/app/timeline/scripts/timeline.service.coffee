'use strict'

srv = (TimelineAPIService) ->
  getEvents = (params, onSuccess) ->
    resource = TimelineAPIService.query params

    resource.$promise.then (response) ->
      submittedDate = getSubmittedDate response
      quotedDate    = getQuotedDate response
      coPilotedDate = getCoPilotedDate response

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

  getSubmittedDate = (events) ->
    submitted = findEvent 'submitted', events
    submitted?.createdAt

  getQuotedDate = (events) ->
    quote = findEvent 'quote-created', events
    quote?.createdAt

  getCoPilotedDate = (events) ->
    copilot = findEvent 'copilot-assigned', events
    copilot?.createdAt

  getEvents: getEvents

srv.$inject = ['TimelineAPIService']

angular.module('app.timeline').factory 'TimelineService', srv

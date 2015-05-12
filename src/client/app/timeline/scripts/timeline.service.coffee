'use strict'

srv = (TimelineAPIService) ->
  getEvents = (params, onSuccess) ->
    resource = TimelineAPIService.query params

    resource.$promise.then (response) ->
      submittedDate = getSubmittedDate response

      timeline =
        events       : response
        submittedDate: submittedDate

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

  findEvent       : findEvent
  getEvents       : getEvents
  getSubmittedDate: getSubmittedDate

srv.$inject = ['TimelineAPIService']

angular.module('app.timeline').factory 'TimelineService', srv

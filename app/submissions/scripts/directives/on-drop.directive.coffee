'use strict'

directive = ->
  restrict: 'A'
  scope:
    onDrop: '&'
  link: (scope, element, attr, ctrl) ->
    element.bind 'drop', (event) ->
      scope.onDrop {event: event}

angular.module('appirio-tech-submissions').directive 'onDrop', directive
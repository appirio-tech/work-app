'use strict';

dir = ->
  link = (scope, element, attrs) ->
    element.bind 'click', ->
      element.focus()

  restrict: 'A'
  link: link

dir.$inject = []

angular.module('app.layout').directive 'focusOnClick', dir


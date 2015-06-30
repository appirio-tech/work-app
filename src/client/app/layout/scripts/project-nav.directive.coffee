'use strict'

# TODO: use controller pattern
# TODO: unit tests
# TODO: turn this into its own component

dir = () ->
  controller: ($state) ->
      console.log 'SP'
      console.log $state.current
  restrict: 'E'
  scope:
    stateTitle: '&'
  templateUrl: 'layout/views/project-nav.html'



dir.$inject = ['$state', '$stateParams']

angular.module('app.layout').directive 'projectNav', dir

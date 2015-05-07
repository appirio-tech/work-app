'use strict'

run = (routerHelper) ->
  states = []

  states.push
    state : 'timeline'
    config:
      url         : '/timeline/:workId'
      title       : 'Timeline'
      controller  : 'TimelineController'
      controllerAs: 'vm'
      templateUrl : 'timeline/views/timeline.html'

  routerHelper.configureStates states

run.$inject = ['routerHelper']

angular.module('app.timeline').run run



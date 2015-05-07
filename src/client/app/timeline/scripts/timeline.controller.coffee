'use strict'

TimelineController = ->
  vm        = this
  vm.greet = 'Hello World'

TimelineController.$inject = []

angular.module('app.timeline').controller 'TimelineController', TimelineController


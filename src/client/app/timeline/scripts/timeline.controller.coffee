'use strict'


TimelineController = (TimelineAPI, $stateParams) ->
  vm        = this
  vm.events = []
  params    =
    workId = $stateParams.workId

  resource = TimelineAPI.query params

  resource.$promise.then (response) ->
    vm.events = response

  resource.$promise.catch ->
    # need handle error

  resource.$promise.finally ->
    # need to handle when done

TimelineController.$inject = ['TimelineAPI', '$stateParams']

angular.module('app.timeline').controller 'TimelineController', TimelineController


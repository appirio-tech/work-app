'use strict'

TimelineController = (TimelineService, $stateParams) ->
  vm        = this
  params    =
    workId = $stateParams.workId

  onSuccess = (timeline) ->
    vm.submittedDate = timeline.submittedDate

  TimelineService.getEvents params, onSuccess

  vm

TimelineController.$inject = ['TimelineService', '$stateParams']

angular.module('app.timeline').controller 'TimelineController', TimelineController


'use strict'

TimelinePageController = ($stateParams) ->
  vm              = this
  vm.workId       = $stateParams.workId

  vm

TimelinePageController.$inject = ['$stateParams']

angular.module('app').controller 'TimelinePageController', TimelinePageController

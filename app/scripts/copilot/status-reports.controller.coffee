'use strict'

StatusReportsController = ($stateParams) ->
  vm        = this
  vm.workId = $stateParams.id
  vm.stepId = $stateParams.stepId

  vm

StatusReportsController.$inject = ['$stateParams']

angular.module('app').controller 'StatusReportsController', StatusReportsController
'use strict'

FinalFixesPageController = ($stateParams) ->
  vm           = this
  vm.projectId = $stateParams.projectId
  vm.stepId    = $stateParams.stepId

  vm

FinalFixesPageController.$inject = ['$stateParams']

angular.module('app').controller 'FinalFixesPageController', FinalFixesPageController
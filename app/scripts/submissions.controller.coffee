'use strict'

SubmissionsPageController = ($stateParams, $state) ->
  vm           = this
  vm.projectId = $stateParams.projectId
  vm.stepId    = $stateParams.stepId
  vm.stepType  = $state.current.stepType

  vm

SubmissionsPageController.$inject = ['$stateParams', '$state']

angular.module('app').controller 'SubmissionsPageController', SubmissionsPageController

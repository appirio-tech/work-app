'use strict'

GenericSubmissionsPageController = ($stateParams, $state, StepsAPIService) ->
  vm           = this
  vm.projectId = $stateParams.projectId
  vm.stepId    = null
  vm.stepType  = null

  onStepsChange = (resource) ->
    resource.$promise.then (response) ->
      response.forEach (step) ->
        # TODO: activate to currently open step
        if (step.stepType == 'designConcepts')
          vm.stepId = step.id
          vm.stepType = step.stepType

  activate = ->
    params =
      projectId: vm.projectId

    StepsAPIService.query params, onStepsChange

    vm

  activate()

GenericSubmissionsPageController.$inject = ['$stateParams', '$state', 'StepsAPIService']

angular.module('app').controller 'GenericSubmissionsPageController', GenericSubmissionsPageController
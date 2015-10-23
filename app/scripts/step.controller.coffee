'use strict'

StepController = ($scope, $stateParams, $rootScope, StepsService) ->
  vm           = this
  vm.projectId = $stateParams.projectId
  vm.stepId    = $stateParams.stepId
  vm.stepType  = null

  onChange = ->
    currentStep = StepsService.getStepById vm.projectId, vm.stepId

    if currentStep
      vm.stepId   = currentStep.id
      vm.stepType = currentStep.stepType

  activate = ->
    destroyStepsListener = $rootScope.$on 'StepsService:changed', ->
      onChange()

    $scope.$on '$destroy', ->
      destroyStepsListener()

    onChange()

  activate()

  vm

StepController.$inject = ['$scope', '$stateParams', '$rootScope', 'StepsService']

angular.module('app').controller 'StepController', StepController
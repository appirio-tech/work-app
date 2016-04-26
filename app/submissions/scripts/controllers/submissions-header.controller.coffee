'use strict'

SubmissionsHeaderController = ($scope, $state, DataService, StepsService) ->
  vm           = this
  vm.projectId = $scope.projectId
  vm.title     = 'Submissions'
  stepId       = $scope.stepId

  activate = ->
    if stepId
      DataService.subscribe $scope, render, [StepsService, 'getStepById', vm.projectId, stepId]

  render = (step) ->
    vm.prev  = step.prevStepId
    vm.next  = step.nextStepId
    vm.title = step.title

  activate()

  vm

SubmissionsHeaderController.$inject = ['$scope', '$state', 'DataService', 'StepsService']

angular.module('appirio-tech-submissions').controller 'SubmissionsHeaderController', SubmissionsHeaderController


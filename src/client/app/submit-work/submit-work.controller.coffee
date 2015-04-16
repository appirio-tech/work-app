'use strict'

SubmitWorkController = ($scope, SubmitWorkService, $state) ->
  $scope.activeState  = SubmitWorkService.activeState
  $scope.work         = SubmitWorkService.work
  $scope.completed    = SubmitWorkService.completed
  $scope.asideService = getEstimate: SubmitWorkService.getEstimate

  # Watch service to set active state
  watchActiveState = ->
    SubmitWorkService.activeState

  setActiveState = (activeState) ->
    $scope.activeState = activeState

  $scope.$watch watchActiveState, setActiveState, true

  # Watch service to set completed
  watchCompleted = ->
    SubmitWorkService.completed

  setCompleted = (completed) ->
    $scope.completed = completed

  $scope.$watch watchCompleted, setCompleted, true

  $scope.launch = ->
    for state in SubmitWorkService.states
      unless state.form?.$valid
        state.form.$setDirty()

        activateState = state unless activateState

    if activateState
      SubmitWorkService.setActiveState activateState
    else
      $state.go 'launch-success'

SubmitWorkController.$inject = ['$scope', 'SubmitWorkService', '$state']

angular.module('app.submit-work').controller 'SubmitWorkController', SubmitWorkController


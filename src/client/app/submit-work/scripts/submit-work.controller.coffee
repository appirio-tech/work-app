'use strict'

SubmitWorkController = ($scope, SubmitWorkService, NavService, $state, $stateParams, work) ->
  $scope.activeState  = NavService.activeState
  $scope.work         = work
  $scope.completed    = NavService.completed
  $scope.asideService = getEstimate: SubmitWorkService.getEstimate

  # Watch service to set active state
  watchActiveState = ->
    NavService.activeState

  setActiveState = (activeState) ->
    $scope.activeState = activeState

  $scope.$watch watchActiveState, setActiveState, true

  # Watch service to set completed
  watchCompleted = ->
    NavService.completed

  setCompleted = (completed) ->
    $scope.completed = completed

  $scope.$watch watchCompleted, setCompleted, true

  $scope.launch = ->
    for state in NavService.states
      unless state.form?.$valid
        state.form.$setDirty()

        activateState = state unless activateState

    if activateState
      NavService.setActiveState activateState
    else
      NavService.reset()
      $state.go 'launch-success'

  activate = ->
    if !work
      SubmitWorkService.resetWork()

  activate()

SubmitWorkController.$inject = ['$scope', 'SubmitWorkService', 'NavService', '$state', '$stateParams', 'work']

angular.module('app.submit-work').controller 'SubmitWorkController', SubmitWorkController


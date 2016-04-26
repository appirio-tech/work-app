'use strict'

ConfirmButtonController = ($scope, StepsService, StepSubmissionsService, RankListService, DataService) ->
  vm             = this
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.permissions = $scope.permissions
  userType       = $scope.userType
  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1

  activate = ->
    DataService.subscribe $scope, render, [
      [StepSubmissionsService, 'get', vm.projectId, vm.stepId]
      [RankListService, 'get', vm.projectId, vm.stepId]
    ]
  render = (step, rankList) ->
    vm.ranks   = rankList
    vm.locked  = userType == 'member' || rankList.confirmed
    vm.confirmRanksEnabled = rankList.allFull && !rankList.confirmed && userType != 'member'
    vm.confirmCommentsEnabled = !step.commentsConfirmed && rankList.confirmed && userType != 'member' && step.stepType == 'completeDesigns'

  vm.confirmRanks = ->
    StepsService.confirmRanks vm.projectId, vm.stepId

  vm.confirmComments = ->
    StepsService.confirmComments vm.projectId, vm.stepId

  activate()

  vm

ConfirmButtonController.$inject = ['$scope', 'StepsService', 'StepSubmissionsService', 'RankListService', 'DataService']

angular.module('appirio-tech-submissions').controller 'ConfirmButtonController', ConfirmButtonController
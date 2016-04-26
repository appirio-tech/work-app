'use strict'

RankDropdownController = ($scope, StepsService, RankListService, DataService) ->
  vm             = this
  projectId      = $scope.projectId
  stepId         = $scope.stepId
  submissionId   = $scope.submissionId
  userType       = $scope.userType
  vm.permissions = $scope.permissions
  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1


  activate = ->
    DataService.subscribe $scope, render, [RankListService, 'get', projectId, stepId]

  render = (rankList) ->
    vm.ranks  = rankList
    vm.rank   = rankList.filter((rank) -> rank.id == submissionId)[0] || {}
    vm.locked = userType == 'member' || rankList.status == 'CLOSED'

  vm.handleRankSelect = (rank) ->
    vm.rank?.value = rank

    if submissionId && vm.rank
      StepsService.updateRank projectId, stepId, submissionId, vm.rank.value

  activate()

  vm

RankDropdownController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService']

angular.module('appirio-tech-submissions').controller 'RankDropdownController', RankDropdownController
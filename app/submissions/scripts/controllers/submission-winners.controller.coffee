'use strict'

SubmissionWinnersController = ($scope, StepsService, RankListService, DataService) ->
  vm        = this
  projectId = $scope.projectId
  stepId    = $scope.stepId

  activate = ->
    DataService.subscribe $scope, render, [RankListService, 'get', projectId, stepId]

  render = (rankList) ->
    vm.ranks = rankList

  activate()

  vm

SubmissionWinnersController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService']

angular.module('appirio-tech-submissions').controller('SubmissionWinnersController', SubmissionWinnersController)
'use strict'

SubmissionsController = ($scope, DataService, StepSubmissionsService, RankListService, UserV3Service) ->
  vm             = this
  vm.loaded      = false
  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType
  vm.permissions = $scope.permissions || ['CREATE', 'UPDATE', 'DELETE']
  userId         = UserV3Service.getCurrentUser()?.id

  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1
  vm.canCreate   = vm.permissions?.indexOf('CREATE') > -1

  activate = ->
    if vm.stepId
      DataService.subscribe $scope, render, [
        [StepSubmissionsService, 'get', vm.projectId, vm.stepId]
        [RankListService, 'get', vm.projectId, vm.stepId]
      ]
    else
      vm.loaded = true

  sortSubmissionsByDate = (submissions) ->
    sorted = submissions.sort (prev, next) ->
      new Date(prev.createdAt) - new Date(next.createdAt)

    sorted[sorted.length - 1]

  render = (step, rankList) ->
    vm.loaded            = true
    vm.title             = step.title
    vm.startsAt          = step.startsAt
    vm.endsAt            = step.endsAt
    vm.nextStepStartsAt  = step.nextStepStartsAt
    vm.isPastDate        = Date.now() < new Date(vm.nextStepStartsAt)
    vm.submissionsDueBy  = step.details.submissionsDueBy
    vm.status            = step.status
    vm.statusValue       = step.statusValue
    vm.stepType          = step.stepType
    vm.submissions       = step.submissions
    vm.latestSubmission  = sortSubmissionsByDate step.submissions
    vm.commentsConfirmed = step.commentsConfirmed
    vm.numberOfRanks     = rankList.length
    vm.userRank          = highestRank rankList, userId
    vm.showConfirm       = rankList.allFull && !rankList.confirmed

  highestRank = (rankList, userId) ->
    for i in [0...rankList.length] by 1
      if rankList[i].id == userId
        return rankList[i].label

  activate()

  vm

SubmissionsController.$inject = ['$scope', 'DataService', 'StepSubmissionsService', 'RankListService', 'UserV3Service']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController

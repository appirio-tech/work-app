'use strict'

SubmissionDetailController = ($scope, DataService, StepSubmissionsService) ->
  vm              = this
  vm.loaded       = false
  vm.submission   = {}
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.userType     = $scope.userType
  vm.permissions  = $scope.permissions

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.loaded                 = true
    vm.submission             = step.submissions.filter((submission) -> submission.id == vm.submissionId)[0]
    vm.stepType               = step.stepType
    vm.statusValue            = step.statusValue
    vm.customerConfirmedRanks = step.details.customerConfirmedRanks

    # assign an arbitrary number to identify each submission on the ui
    if !vm.submissionIdMap && vm.submission
      vm.submissionIdMap = {}
      submissionsCopy = step.submissions.slice()
      ordered = submissionsCopy.sort (previous, next) ->
        new Date(previous.createdAt) - new Date(next.createdAt)
      ordered.forEach (submission, index) ->
        vm.submissionIdMap[submission.id] = index + 1

      vm.submissionNumber = "# #{vm.submissionIdMap[vm.submission.id]}"

  activate()

  vm

SubmissionDetailController.$inject = ['$scope', 'DataService', 'StepSubmissionsService']

angular.module('submissions').controller 'SubmissionDetailController', SubmissionDetailController
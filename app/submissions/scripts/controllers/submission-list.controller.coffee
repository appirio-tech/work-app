'use strict'

SubmissionListController = ($scope, DataService, StepSubmissionsService) ->
  vm             = this
  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.submissions = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.permissions = $scope.permissions
  vm.userType    = $scope.userType

  vm.canUpdate = vm.permissions?.indexOf('UPDATE') > -1
  vm.canCreate = vm.permissions?.indexOf('CREATE') > -1

  vm.generateProfileUrl = (handle) ->
    "https://www.topcoder.com/members/#{handle}"

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.submissions            = step.submissions
    vm.status                 = step.status
    vm.statusValue            = step.statusValue
    vm.fileCount              = step.fileCount
    vm.customerConfirmedRanks = step.details.customerConfirmedRanks

    # assign an arbitrary number to identify each submission on the ui
    if vm.submissions.length > 0
      if !vm.submissionIdMap
        vm.submissionIdMap = {}
        submissionsCopy = vm.submissions.slice()

        ordered = submissionsCopy.sort (previous, next) ->
          new Date(previous.createdAt) - new Date(next.createdAt)

        ordered.forEach (submission, index) ->
          vm.submissionIdMap[submission.id] = index + 1

  activate()

  vm

SubmissionListController.$inject = ['$scope', 'DataService', 'StepSubmissionsService']

angular.module('submissions').controller 'SubmissionListController', SubmissionListController

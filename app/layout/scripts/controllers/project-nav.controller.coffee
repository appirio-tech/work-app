'use strict'

ProjectNavController = ($scope, $state, DataService, StepsService, ProjectsAPIService, $rootScope) ->
  vm               = this
  vm.workId        = $scope.workId
  vm.currentStepId = null
  vm.threadId      = null
  vm.userType      = $scope.userType || 'customer'
  vm.customer     = vm.userType == 'customer'
  vm.copilot      = vm.userType == 'copilot'
  vm.admin        = vm.userType == 'admin'
  vm.member       = vm.userType == 'member'

  onChange = (step) ->
    vm.currentStepId = step.id

    stateName         = $state.current.name
    submissionsStates = [
      'step'
      'submission-detail'
      'file-detail'
    ]

    isSubmissionState = submissionsStates.indexOf(stateName) > -1
    vm.activeLink     = stateName
    vm.activeLink     = 'submissions' if isSubmissionState

  activate = ->
    if vm.workId
      params =
        id: vm.workId

      resource = ProjectsAPIService.get params

      resource.$promise.then (response) ->
        vm.threadId = response.threadId

    if vm.currentStepId
      DataService.subscribe $scope, onChange, [StepsService, 'getStepById', vm.workId, vm.currentStepId]
    else
      DataService.subscribe $scope, onChange, [StepsService, 'getCurrentStep', vm.workId]

  activate()

  vm

ProjectNavController.$inject = [
  '$scope'
  '$state'
  'DataService'
  'StepsService'
  'ProjectsAPIService'
  '$rootScope'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController

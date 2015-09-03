'use strict'

SubmissionDetailPageController = ($stateParams) ->
  vm              = this
  vm.projectId    = $stateParams.projectId
  vm.stepId       = $stateParams.stepId
  vm.submissionId = $stateParams.submissionId

  vm

SubmissionDetailPageController.$inject = ['$stateParams']

angular.module('app').controller 'SubmissionDetailPageController', SubmissionDetailPageController

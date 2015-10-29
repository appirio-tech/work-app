'use strict'

SubmissionDetailPageController = ($stateParams, UserV3Service) ->
  vm              = this
  vm.projectId    = $stateParams.projectId
  vm.stepId       = $stateParams.stepId
  vm.submissionId = $stateParams.submissionId
  vm.userRole     = UserV3Service.getCurrentUser().role

  vm

SubmissionDetailPageController.$inject = ['$stateParams', 'UserV3Service']

angular.module('app').controller 'SubmissionDetailPageController', SubmissionDetailPageController

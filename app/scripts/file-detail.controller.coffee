'use strict'

FileDetailPageController = ($stateParams) ->
  vm              = this
  vm.projectId    = $stateParams.projectId
  vm.stepId       = $stateParams.stepId
  vm.submissionId = $stateParams.submissionId
  vm.fileId       = $stateParams.fileId
  vm.isModal      = $stateParams.modal

  vm

FileDetailPageController.$inject = ['$stateParams']

angular.module('app').controller 'FileDetailPageController', FileDetailPageController
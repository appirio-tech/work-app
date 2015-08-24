'use strict'

SubmissionDetailsPageController = ($stateParams) ->
  vm              = this
  vm.workId       = $stateParams.workId
  vm.submissionId = $stateParams.submissionId

  vm

SubmissionDetailsPageController.$inject = ['$stateParams']

angular.module('app').controller 'SubmissionDetailsPageController', SubmissionDetailsPageController

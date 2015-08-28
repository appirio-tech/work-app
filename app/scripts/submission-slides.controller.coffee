'use strict'

SlidesPageController = ($stateParams) ->
  vm              = this
  vm.workId       = $stateParams.workId
  vm.submissionId = $stateParams.submissionId
  vm.fileId = $stateParams.fileId

  vm

SlidesPageController.$inject = ['$stateParams']

angular.module('app').controller 'SlidesPageController', SlidesPageController
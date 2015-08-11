'use strict'

SubmissionsPageController = ($stateParams) ->
  vm        = this
  vm.workId = $stateParams.workId
  vm.phase  = $stateParams.phase

  vm

SubmissionsPageController.$inject = ['$stateParams']

angular.module('app').controller 'SubmissionsPageController', SubmissionsPageController

'use strict'

FinalFixesController = ($stateParams) ->
  vm              = this
  vm.workId       = $stateParams.workId

  vm

FinalFixesController.$inject = ['$stateParams']

angular.module('app').controller 'FinalFixesController', FinalFixesController
'use strict'

SubmitWorkPageController = ($stateParams) ->
  vm    = this
  vm.id = $stateParams.id

  vm

SubmitWorkPageController.$inject = ['$stateParams']

angular.module('app').controller 'SubmitWorkPageController', SubmitWorkPageController

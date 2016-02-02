'use strict'

store = require '../store'

SubmitWorkPageController = ($stateParams) ->
  vm       = this
  vm.id    = $stateParams.id
  vm.store = store

  vm

SubmitWorkPageController.$inject = ['$stateParams']

angular.module('app').controller 'SubmitWorkPageController', SubmitWorkPageController

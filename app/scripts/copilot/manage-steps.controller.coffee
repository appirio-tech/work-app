'use strict'

store = require '../../store'

ManageStepsController = ($stateParams) ->
  vm           = this
  vm.projectId = $stateParams.projectId
  vm.store     = store

  vm

ManageStepsController.$inject = ['$stateParams']

angular.module('app').controller 'ManageStepsController', ManageStepsController
'use strict'

CopilotProjectsController = ($stateParams) ->
  vm = this
  vm.id = $stateParams.id

  vm

CopilotProjectsController.$inject = ['$stateParams']

angular.module('app').controller 'CopilotProjectsController', CopilotProjectsController

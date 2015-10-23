'use strict'

CopilotProjectDetailsPageController = ($stateParams) ->
  vm = this
  vm.id = $stateParams.id

  vm

CopilotProjectDetailsPageController.$inject = ['$stateParams']

angular.module('app').controller 'CopilotProjectDetailsPageController', CopilotProjectDetailsPageController

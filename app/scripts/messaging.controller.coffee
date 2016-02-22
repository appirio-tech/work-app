'use strict'

permissions = require './permissions'

MessagingPageController = (
  $stateParams
  $state
  $window
  UserV3Service
  $scope
  ProjectsAPIService
) ->
  vm              = this
  vm.workId       = $stateParams.id
  vm.threadId     = $stateParams.threadId
  vm.isClient     = $state.current.name == 'messaging'
  vm.subscriberId = null
  vm.hasCopilot   = false
  vm.working      = false

  user            = UserV3Service.getCurrentUser()
  vm.userRole     = user?.role
  vm.subscriberId = user?.id
  vm.permissions  = permissions user?.role

  vm.back = ->
    $window.history.back()

  activate = ->
    vm.working = true

    resource = ProjectsAPIService.get(id: $stateParams.id).$promise

    resource.then (project) ->
      vm.hasCopilot = project.copilotId != "unassigned"

    resource.finally ->
      vm.working = false

    vm

  activate()

MessagingPageController.$inject = [
  '$stateParams'
  '$state'
  '$window'
  'UserV3Service'
  '$scope'
  'ProjectsAPIService'
]

angular.module('app').controller 'MessagingPageController', MessagingPageController

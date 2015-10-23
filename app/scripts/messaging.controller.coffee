'use strict'

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
  vm.hasCoilot    = false
  vm.working      = false

  $scope.$watch UserV3Service.getCurrentUser, ->
    user            = UserV3Service.getCurrentUser()
    vm.subscriberId = user.id if user

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

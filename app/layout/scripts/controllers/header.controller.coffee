'use strict'

LayoutHeaderController = (
  $state
  UserV3Service
  ThreadsAPIService
  SubmitWorkAPIService
  InboxesProjectAPIService
) ->
  vm              = this
  vm.userType     = vm.userType || 'customer'
  vm.customer     = vm.userType == 'customer'
  vm.copilot      = vm.userType == 'copilot'
  vm.admin        = vm.userType == 'admin'
  vm.member       = vm.userType == 'member'
  vm.loggedIn     = false

  getNotificationCount = (id) ->
    resource = InboxesProjectAPIService.get()

    resource.$promise.then (response) ->
      vm.unreadCount = response.totalUnreadCount

  onUserChange = ->
    user = UserV3Service.getCurrentUser()

    if user?.id
      vm.loggedIn     = true
      vm.subscriberId = user.id
      vm.handle       = user.handle
      vm.userAvatar   = user.avatar

      getNotificationCount user.id

  onProjectChange = (response) ->
    if response.name
      vm.appName = response.name
    else
      vm.appName = ''

  setAppName = (stateName) ->
    hiddenAppNameStates =
      'view-work-multiple': true
      'copilot-projects': true
      'copilot-open-projects': true

    vm.showAppName = true unless hiddenAppNameStates[stateName]

  activate = ->
    params =
      id: vm.workId

    onUserChange()

    setAppName $state.current.name

    if vm.workId
      SubmitWorkAPIService.get params, onProjectChange

  activate()

  vm

LayoutHeaderController.$inject = [
  '$state'
  'UserV3Service'
  'ThreadsAPIService'
  'SubmitWorkAPIService'
  'InboxesProjectAPIService'
]

angular.module('appirio-tech-ng-work-layout').controller 'LayoutHeaderController', LayoutHeaderController

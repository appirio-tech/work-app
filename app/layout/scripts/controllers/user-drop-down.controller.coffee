'use strict'

{ logout } = require '../../../auth/user-v3.service.js'

UserDropDownController = ($scope, $state, UserV3Service) ->
  vm = this
  vm.handle = ''
  vm.loggingOut = false

  onUserChange = ->
    user = UserV3Service.getCurrentUser()

    vm.handle = user?.handle

  vm.logout = ->
    vm.loggingOut = true

    logout().then ->
      $state.go 'home', {}, reload: true

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, onUserChange

    vm

  activate()

UserDropDownController.$inject = [
  '$scope'
  '$state'
  'UserV3Service'
]

angular.module('work-layout').controller 'UserDropDownController', UserDropDownController

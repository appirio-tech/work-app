'use strict'

SSOCallbackController = ($scope, $state, TokenService, UserV3Service) ->
  vm      = this
  token   = $scope.token
  status  = $scope.status
  message = $scope.message
  auto    = $scope.auto != 'false'

  activate = ->
    if token
      TokenService.setAppirioJWT token

    if auto
      UserV3Service.loadUser().then (currentUser) ->
        if currentUser.role == 'customer'
          $state.go 'view-work-multiple'
        else if currentUser.role == 'copilot'
          $state.go 'copilot-projects'
        else
          $state.go 'home'

  activate()

  vm

SSOCallbackController.$inject = [
  '$scope'
  '$state'
  'TokenService'
  'UserV3Service'
]

angular.module('appirio-tech-ng-login-reg').controller 'SSOCallbackController', SSOCallbackController



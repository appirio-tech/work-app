'use strict'

ResetPasswordController = ($stateParams, $state, AuthService) ->
  vm          = this
  vm.password = ''
  vm.success  = false
  vm.error    = ''
  token       = $stateParams.token
  handle      = $stateParams.handle

  vm.submit = ->
    vm.error = false

    AuthService.resetPassword(handle, token, vm.password).then(success).catch(failure)

  success = ->
    vm.success = true

    $state.go 'login', { passwordReset: true }

  failure = (res) ->
    vm.error = res.data.result.content

  vm

ResetPasswordController.$inject = [
  '$stateParams'
  '$state'
  'AuthService'
]

angular.module('appirio-tech-ng-login-reg').controller 'ResetPasswordController', ResetPasswordController



'use strict'

ForgotPasswordController = ($stateParams, AuthService) ->
  vm          = this
  vm.email    = ''
  vm.error    = ''
  vm.success  = false

  vm.submit = ->
    vm.error   = false
    email      = encodeURIComponent vm.email

    AuthService.sendResetEmail(email).then(success).catch(failure)

  success = ->
    vm.success = true

  failure = (res) ->
    vm.error = res.result.content

  vm

ForgotPasswordController.$inject = [
  '$stateParams'
  'AuthService'
]

angular.module('appirio-tech-ng-login-reg').controller 'ForgotPasswordController', ForgotPasswordController



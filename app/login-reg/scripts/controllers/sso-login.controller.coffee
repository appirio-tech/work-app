'use strict'

SSOLoginController = ($state, $stateParams, $window, AuthService) ->
  vm               = this
  vm.loading       = false
  vm.success       = false
  vm.error         = ''
  vm.emailOrHandle = ''
  vm.org           = $stateParams.org

  activate = ->
    if vm.org
      go()

  vm.submit = ->
    vm.loading = true

    success = (org) ->
      vm.org     = org
      vm.success = true

      go()

    failure = (err) ->
      vm.loading = false
      vm.error   = err.message

    AuthService.getSSOProvider(vm.emailOrHandle).then(success).catch(failure)

  go = ->
    callbackUrl = $state.href 'SSO_CALLBACK', {}, { absolute: true }
    authUrl     = AuthService.generateSSOUrl vm.org, callbackUrl

    $window.location.href = authUrl;

  activate()

  vm

SSOLoginController.$inject = [
  '$state'
  '$stateParams'
  '$window'
  'AuthService'
]

angular.module('appirio-tech-ng-login-reg').controller 'SSOLoginController', SSOLoginController



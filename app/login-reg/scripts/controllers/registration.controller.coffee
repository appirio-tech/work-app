'use strict'

RegistrationController = ($state, AuthService, UserV3Service) ->
  vm                        = this
  vm.title                  = 'Register'
  vm.username               = ''
  vm.password               = ''
  vm.firstName              = ''
  vm.lastName               = ''
  vm.error                  = false
  vm.errorMessage           = 'Error Creating User'
  vm.submit                 = null
  vm.loading                = false

  vm.submit = ->
    vm.error = false
    vm.loading = true

    # Get the absolute url to our the confirmation page
    afterActivationURL = $state.href('login', { activated: true }, { absolute: true })

    registerOptions =
      handle            : vm.username
      password          : vm.password
      firstName         : vm.firstName
      lastName          : vm.lastName
      email             : vm.email
      afterActivationURL: afterActivationURL

    UserV3Service.createUser registerOptions, registerSuccess, registerError

  registerError = (error) ->
    vm.error        = true
    vm.loading      = false
    vm.errorMessage = error.data.result.content

  success = ->
    $state.go 'view-work-multiple'

  registerSuccess = ->
    vm.error   = false
    vm.loading = false
    $state.go 'registration-success'

    loginOptions =
      username: vm.username
      password: vm.password
      success : success

    AuthService.login loginOptions

  activate = ->
    vm

  activate()

RegistrationController.$inject = [
  '$state'
  'AuthService'
  'UserV3Service'
]

angular.module('appirio-tech-ng-login-reg').controller 'RegistrationController', RegistrationController

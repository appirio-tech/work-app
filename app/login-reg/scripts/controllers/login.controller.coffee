'use strict'

LoginController = ($rootScope, $location, $state, $stateParams, AuthService, UserV3Service) ->
  vm           = this
  vm.title     = 'Login'
  vm.username  = ''
  vm.password  = ''
  vm.error     = false
  vm.submit    = null
  vm.loading   = false
  vm.activated = $stateParams.activated

  vm.submit = ->
    vm.error   = false
    vm.loading = true

    loginOptions =
      username: vm.username
      password: vm.password
      error   : loginFailure
      success : loginSuccess

    AuthService.login loginOptions

  loginFailure = (error) ->
    vm.error   = true
    vm.loading = false

  loginSuccess = ->
    vm.error   = false
    vm.loading = false

    UserV3Service.loadUser().then (currentUser) ->
      urlToken = $location.search()

      if urlToken.retUrl
        $location.path(urlToken.retUrl).replace()
      else if urlToken.retState
        $state.go(urlToken.retState)
      else if $rootScope.preAuthState
        preAuthState = $rootScope.preAuthState
        preAuthParams = $rootScope.preAuthParams

        delete $rootScope.preAuthState
        delete $rootScope.preAuthParams

        $state.go preAuthState, preAuthParams
      else if currentUser.role == 'customer'
        $state.go 'view-work-multiple'
      else if currentUser.role == 'copilot'
        $state.go 'copilot-projects'
      else
        $state.go 'home'

  activate = ->
    vm

  activate()

LoginController.$inject = [
  '$rootScope'
  '$location'
  '$state'
  '$stateParams'
  'AuthService'
  'UserV3Service'
]

angular.module('appirio-tech-ng-login-reg').controller 'LoginController', LoginController



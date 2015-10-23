run = ($rootScope, $state, AuthService) ->
  checkPermission = (event, toState) ->
    unless toState.public || AuthService.isLoggedIn()
      $rootScope.preAuthState = toState.name
      event.preventDefault()

      $state.go 'login'

  addFileDetailHistoryHook = (event, toState, toParams, fromState, fromParams) ->
    if toState.name == 'file-detail' && fromState.name != 'file-detail'
      $rootScope.preFileDetailState = fromState
      $rootScope.preFileDetailParams = fromParams

  $rootScope.$on '$stateChangeStart', addFileDetailHistoryHook
  $rootScope.$on '$stateChangeStart', checkPermission

run.$inject = ['$rootScope', '$state', 'AuthService']

angular.module('app').run run
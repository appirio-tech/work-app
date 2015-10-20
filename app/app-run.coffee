run = ($rootScope, $state, AuthService) ->
  checkPermission = (event, toState) ->
    unless toState.public || AuthService.isLoggedIn()
      $rootScope.preAuthState = toState.name
      event.preventDefault()

      $state.go 'login'

  $rootScope.$on '$stateChangeStart', checkPermission

run.$inject = ['$rootScope', '$state', 'AuthService']

angular.module('app').run run
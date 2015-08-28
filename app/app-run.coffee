run = ($rootScope, $state, AuthService) ->
  checkPermission = (event, nextState) ->
    if nextState.persmission
      unless AuthService.isLoggedIn()
        # TODO: save requested state to redirect after login
        # $rootScope.preAuthState = toState.name
        event.preventDefault()

        $state.go 'login'

  $rootScope.$on '$stateChangeStart', checkPermission

run.$inject = ['$rootScope', '$state', 'AuthService']

angular.module('app').run run
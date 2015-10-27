run = ($rootScope, $state, $urlRouter, AuthService, UserV3Service) ->
  checkPermission = (event, toState, toParams, fromState, fromParams) ->

    # Route is public, ignore the rest of the permission logic
    if toState.public
      return true

    # Check if the user is logged in
    unless AuthService.isLoggedIn()
      $rootScope.preAuthState = toState.name
      event.preventDefault()

      return $state.go 'login'

    currentUser = UserV3Service.getCurrentUser()

    # Check if the user has loaded
    unless currentUser
      event.preventDefault()
      return UserV3Service.loadUser().then ->
        # Retry the state change once user has loaded
        $urlRouter.sync()

    # Check if the user is the right role to this access route
    unless toState.rolesAllowed.indexOf(currentUser.role) > -1
      event.preventDefault()

      # TODO: Notify user that route was protected
      return $state.go 'home'

  addFileDetailHistoryHook = (event, toState, toParams, fromState, fromParams) ->
    if toState.name == 'file-detail' && fromState.name && fromState.name != 'file-detail'
      $rootScope.preFileDetailState = fromState
      $rootScope.preFileDetailParams = fromParams

  $rootScope.$on '$stateChangeStart', addFileDetailHistoryHook
  $rootScope.$on '$stateChangeStart', checkPermission

run.$inject = ['$rootScope', '$state', '$urlRouter', 'AuthService', 'UserV3Service']

angular.module('app').run run
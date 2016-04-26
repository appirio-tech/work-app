{ getCurrentUser, loadUser } = require './auth/user-v3.service.js'
{ ACCOUNTS_URL } = require './constants'

run = ($rootScope, $state, $urlRouter, UserV3Service) ->
  checkPermission = (event, toState, toParams, fromState, fromParams) ->
    # Route is public, ignore the rest of the permission logic
    if toState.public
      return true

    currentUser = getCurrentUser()

    # No user has been loaded yet
    if !currentUser

      # Kill the current request
      # https://github.com/angular-ui/ui-router/wiki#state-change-events
      event.preventDefault()

      loadUserSuccess = ->
        # Retry the state transition
        # https://github.com/angular-ui/ui-router/wiki/Quick-Reference#urlroutersync
        $urlRouter.sync()

      loadUserFailure = ->
        returnUrl   = $state.href toState.name, toParams, { absolute: true }
        accountsUrl = ACCOUNTS_URL + '?retUrl=' + encodeURIComponent(returnUrl) 

        # Redirect to Topcoder's unified login site
        window.location = accountsUrl

      loadUser().then(loadUserSuccess, loadUserFailure)

      return false
    else
      # If the user has the correct role for this route, complete the transition
      if toState.rolesAllowed.indexOf(currentUser.role) > -1
        return true

      # If the user is a copilot and was trying to access home, take them to
      # copilot projects page
      if currentUser.role == 'copilot' && toState.name == 'home'
        return $state.go 'projects'

      # If we've made it all the way here, the user is logged in, but not
      # allowed to access this route
      $state.go 'forbidden'

  addFileDetailHistory = (event, toState, toParams, fromState, fromParams) ->
    if toState.name == 'file-detail' && fromState.name && fromState.name != 'file-detail'
      $rootScope.preFileDetailState = fromState
      $rootScope.preFileDetailParams = fromParams

  updateTitle = (event, toState) ->
    document.title = toState.title || 'Topcoder Connect'

  $rootScope.$on '$stateChangeStart', addFileDetailHistory
  $rootScope.$on '$stateChangeStart', checkPermission
  $rootScope.$on '$stateChangeSuccess', updateTitle

run.$inject = ['$rootScope', '$state', '$urlRouter', 'UserV3Service']

angular.module('app').run run
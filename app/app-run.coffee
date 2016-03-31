{ getToken } = require('appirio-accounts-app/connector/connector-wrapper.js')
{ isTokenExpired } = require('appirio-accounts-app/core/token.js')

currentUser = null

run = ($rootScope, $state, $urlRouter, UserV3Service) ->
  checkPermission = (event, toState, toParams, fromState, fromParams) ->
    # Route is public, ignore the rest of the permission logic
    if toState.public
      return true

    # No user has been loaded yet
    if !currentUser

      # Kill the current request
      # https://github.com/angular-ui/ui-router/wiki#state-change-events
      event.preventDefault()

      loadUserSuccess = (user) ->
        currentUser = user
        $urlRouter.sync()

      loadUserFailure = ->
        returnUrl = $state.href toState.name, toParams, { absolute: true }

        # accountsUrl = constants.ACCOUNTS_LOGIN_URL + '?retUrl=' + encodeURIComponent(constants.LOGIN_RETURN_URL) 
        accountsUrl = 'http://localhost:8000/#connect' + '?retUrl=' + encodeURIComponent(returnUrl) 
        console.log 'redirect to '　+ accountsUrl
        window.location = accountsUrl

      UserV3Service.loadUser().then(loadUserSuccess, loadUserFailure)

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
    document.title = toState.title || 'ASP'

  $rootScope.$on '$stateChangeStart', addFileDetailHistory
  $rootScope.$on '$stateChangeStart', checkPermission
  $rootScope.$on '$stateChangeSuccess', updateTitle

run.$inject = ['$rootScope', '$state', '$urlRouter', 'UserV3Service']

angular.module('app').run run
/* jshint -W106 */
(function () {
  'use strict';

  angular
    .module('app.auth', [
      'angular-storage',
      'angular-jwt',
      'app.constants',
      'auth0',
      'blocks.logger'
    ])
    .config(authConfig)
    .run(authRun);

  authConfig.$inject = ['$httpProvider', 'jwtInterceptorProvider', 'authProvider', 'auth0Domain', 'auth0ClientId', 'auth0callbackUrl'];

  function authConfig($httpProvider, jwtInterceptorProvider, authProvider, auth0Domain, auth0ClientId, auth0callbackUrl) {

    /* Add Token to API Calls */

    jwtInterceptor.$inject = ['TokenService'];

    function jwtInterceptor(TokenService) {
      return TokenService.getToken();
    }

    jwtInterceptorProvider.tokenGetter = jwtInterceptor;

    $httpProvider.interceptors.push('jwtInterceptor');

    /* Add auth0 provider */
    authProvider.init({
      domain  : auth0Domain,
      clientID: auth0ClientId,
      loginState: 'login'
    });

    // Log out handler
    logout.$inject = ['TokenService'];

    function logout(TokenService) {
      TokenService.deleteToken();
    }

    authProvider.on('logout', logout);
  }

  authRun.$inject = ['$rootScope', 'ApiResource', 'auth', 'TokenService', 'AuthService'];

  function authRun($rootScope, ApiResource, auth, TokenService, AuthService) {
    // Setup the resource
    var config = {
      url     : 'authorizations',
      resource: 'auth'
    };

    ApiResource.add(config);

    auth.hookEvents();

    // Make sure the token is valid and not expired
    function CheckToken() {
      if (!auth.isAuthenticated && TokenService.tokenIsValid()) {
        var tokens = TokenService.getAuth0Tokens();
        auth.authenticate(tokens.profile, tokens.idToken);
        $rootScope.$broadcast('authenticated');
      } else if (TokenService.getToken() && !TokenService.tokenIsValid()) {
        AuthService.refreshToken();
      }
    }

    $rootScope.$on('$locationChangeStart', CheckToken);
  }
})();

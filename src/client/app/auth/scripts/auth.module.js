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

    /* Handle exchanging auth0 token with our auth service token */

    authenticated.$inject = ['$rootScope', 'AuthService', 'logger', 'idToken', 'refreshToken'];

    function loginSuccess($rootScope, AuthService, logger, idToken, refreshToken) {
      logger.info('Logged In');
      exchangeToken(AuthService, idToken, refreshToken, logger);
      // We use a different emit so we do not bind ourselves to auth0
      // outside of the auth library
      $rootScope.$emit('loginSuccess');
    }

    authenticated.$inject = ['$rootScope', 'AuthService', 'logger', 'idToken', 'refreshToken'];

    function authenticated($rootScope, AuthService, logger, idToken, refreshToken) {
      logger.info('Authenticated');
      exchangeToken(AuthService, idToken, refreshToken, logger);
      // We use a different emit so we do not bind ourselves to auth0
      // outside of the auth library
      $rootScope.$emit('authenticated');
    }

    function exchangeToken(AuthService, idToken, refreshToken, logger) {
      logger.info('Exchanging Token');
      AuthService.exchangeToken(idToken, refreshToken);
    }

    // Log out handler
    logout.$inject = ['TokenService'];

    function logout(TokenService) {
      TokenService.deleteToken();
    }

    authProvider.on('loginSuccess', loginSuccess);
    authProvider.on('authenticated', authenticated);
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
      if (!TokenService.tokenIsValid()) {
        var token = TokenService.getToken();

        if (token) {
          var tokens = TokenService.getAuth0Tokens();
          auth.authenticate(tokens.profile, tokens.idToken);
        }
      } else {
        var tokens = TokenService.getAuth0Tokens();
        auth.refreshIdToken(tokens.refreshToken)
          .then(function(newToken) {
            TokenService.setAuth0Tokens(
              tokens.profile,
              newToken,
              tokens.accessToken,
              tokens.refreshToken
            );

            auth.authenticate(tokens.profile, newToken);
          });
      }
    }

    $rootScope.$on('$locationChangeStart', CheckToken);
  }
})();

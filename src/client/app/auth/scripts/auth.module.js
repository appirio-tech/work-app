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

    jwtInterceptor.$inject = ['TokenService'];

    function jwtInterceptor(TokenService) {
      return TokenService.refreshToken();
    }

    jwtInterceptorProvider.tokenGetter = jwtInterceptor;

    $httpProvider.interceptors.push('jwtInterceptor');

    // Add auth0 provider
    authProvider.init({
      domain  : auth0Domain,
      clientID: auth0ClientId,
      loginState: 'login',
      callbackURL: auth0callbackUrl,
      sso: false
    });

    authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
      console.log("Login Success");
    });

    authProvider.on('authenticated', function($location) {
      console.log("Authenticated");

    });

    authProvider.on('logout', function() {
      console.log("Logged out");
    })
  }

  authRun.$inject = ['$rootScope', '$location', 'ApiResource', 'TokenService', 'auth0TokenName'];

  function authRun($rootScope, $location, ApiResource, TokenService, auth0TokenName) {
    // Setup the resource
    var config = {
      url     : 'authorizations',
      resource: 'auth'
    };

    ApiResource.add(config);

    $rootScope.$on('$locationChangeStart', function() {
      // Add the token to the local store if it's in the url
      var urlToken = $location.search()[auth0TokenName];
      if (urlToken && urlToken !== 'undefined') {
        TokenService.setToken(urlToken);
        $location.search(auth0TokenName, null);
      }
    });
  }
})();

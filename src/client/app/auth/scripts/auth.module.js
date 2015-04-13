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
      responseType: 'code',
      sso: false,
      callbackURL: auth0callbackUrl
    });

    authProvider.on('logout', function() {
      console.log('logout');
    });

    authProvider.on('authenticated', function(auth) {
      console.log(auth.isAuthenticated);
      console.log('authenticated');
    });

    authProvider.on('loginSucces', function(auth) {
      console.log('loginSuccess');
      console.log(auth.isAuthenticated);
    })
  }

  authRun.$inject = ['$rootScope', '$location', 'ApiResource', 'auth', 'TokenService', 'auth0TokenName', 'store'];

  function authRun($rootScope, $location, ApiResource, auth, TokenService, auth0TokenName, store) {
    // Setup the resource
    var config = {
      url     : 'authorizations',
      resource: 'auth'
    };

    ApiResource.add(config);

    auth.hookEvents();

    function CheckToken() {
      // Add the token to the local store if it's in the url
      var urlToken = $location.search();

      if (urlToken[auth0TokenName] && urlToken[auth0TokenName] !== 'undefined') {
        TokenService.setToken(urlToken[auth0TokenName]);
        $location.search(auth0TokenName, null);

        var authState = store.get('login-state');
        $rootScope.$broadcast('loginComplete', authState);
      }
    }

    $rootScope.$on('$locationChangeStart', CheckToken);
  }
})();

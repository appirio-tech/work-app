(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('TokenService', TokenService);

  TokenService.$inject = ['$rootScope', '$http', 'exception', 'store', 'auth0TokenName', 'jwtHelper', 'apiUrl'];
  /* @ngInject */
  function TokenService($rootScope, $http, exception, store, auth0TokenName, jwtHelper, apiUrl) {
    var service = {
      getToken: getToken,
      deleteToken: deleteToken,
      decodeToken: decodeToken,
      setToken: setToken,
      tokenIsValid: tokenIsValid,
      getAuth0Tokens: getAuth0Tokens,
      setAuth0Tokens: setAuth0Tokens,
      deleteAuth0Tokens: deleteAuth0Tokens
    };

    return service;

    function getToken() {
      // the angular-store module takes care of the caching
      return store.get(auth0TokenName);
    }

    function setToken(token) {
      store.set(auth0TokenName, token);
    }

    function deleteToken() {
      store.remove(auth0TokenName);
      deleteAuth0Tokens();
    }

    function decodeToken() {
      var token = getToken();

      if (token) {
        return jwtHelper.decodeToken(token);
      }

      return {};
    }

    function tokenIsValid() {
      var token = getToken();

      if (token && token !== 'undefined' &&
          angular.isString(token) &&
          !jwtHelper.isTokenExpired(token)) {

        return true;
      }

      return false;
    }

    function getAuth0Tokens() {
      return {
        idToken: store.get('auth0IdToken'),
        profile: store.get('auth0Profile'),
        accessToken: store.get('auth0AccessToken'),
        refreshToken: store.get('auth0RefreshToken')
      }
    }

    function setAuth0Tokens(profile, idToken, accessToken, refreshToken) {
      store.set('auth0IdToken', idToken);
      store.set('auth0Profile', profile);
      store.set('auth0AccessToken', accessToken);
      store.set('auth0RefreshToken', refreshToken);
    }

    function deleteAuth0Tokens() {
      store.remove('auth0IdToken');
      store.remove('auth0Profile');
      store.remove('auth0AccessToken');
      store.remove('auth0RefreshToken');
    }
  }
})();

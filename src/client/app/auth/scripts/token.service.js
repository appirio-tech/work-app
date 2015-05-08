(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('TokenService', TokenService);

  TokenService.$inject = ['$rootScope', '$http', 'exception', 'store', 'auth0TokenName', 'jwtHelper', 'apiUrl'];
  /* @ngInject */
  function TokenService($rootScope, $http, exception, store, auth0TokenName, jwtHelper, apiUrl) {
    var service = {
      getToken: null,
      deleteToken: null,
      decodeToken: null,
      setToken: null,
      tokenIsValid: null,
      getAuth0Tokens: null,
      setAuth0Tokens: null,
      deleteAuth0Tokens: null
    };

    service.getToken = function() {
      // the angular-store module takes care of the caching
      return store.get(auth0TokenName);
    };

    service.setToken = function(token) {
      store.set(auth0TokenName, token);
    };

    service.deleteToken = function () {
      store.remove(auth0TokenName);
      deleteAuth0Tokens();
    };

    service.decodeToken = function () {
      var token = getToken();

      if (token) {
        return jwtHelper.decodeToken(token);
      }

      return {};
    };

    service.tokenIsValid = function () {
      var token = getToken();

      if (token && token !== 'undefined' &&
          angular.isString(token) &&
          !jwtHelper.isTokenExpired(token)) {

        return true;
      }

      return false;
    };

    service.getAuth0Tokens = function () {
      return {
        idToken: store.get('auth0IdToken'),
        profile: store.get('auth0Profile'),
        accessToken: store.get('auth0AccessToken'),
        refreshToken: store.get('auth0RefreshToken')
      }
    };

    service.setAuth0Tokens = function(profile, idToken, accessToken, refreshToken) {
      store.set('auth0IdToken', idToken);
      store.set('auth0Profile', profile);
      store.set('auth0AccessToken', accessToken);
      store.set('auth0RefreshToken', refreshToken);
    };

    service.deleteAuth0Tokens = function() {
      store.remove('auth0IdToken');
      store.remove('auth0Profile');
      store.remove('auth0AccessToken');
      store.remove('auth0RefreshToken');
    }

    return service;
  }
})();

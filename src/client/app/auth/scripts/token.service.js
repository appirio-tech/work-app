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
    };

    service.decodeToken = function () {
      var token = service.getToken();

      if (token) {
        return jwtHelper.decodeToken(token);
      }

      return {};
    };

    service.tokenIsValid = function () {
      var token = service.getToken();

      return !!(token && token !== 'undefined' &&
      angular.isString(token) && !jwtHelper.isTokenExpired(token));
    };

    return service;
  }
})();

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
      refreshToken: refreshToken
    };

    return service;

    function refreshToken() {
      var idToken = getToken();

      if (idToken && idToken !== 'undefined' && angular.isString(idToken)) {
        if (jwtHelper.isTokenExpired(idToken)) {
          // This is a promise of a JWT id_token
          return $http({
            url: apiUrl + 'authorizations/1',
            // This makes it so that this request doesn't send the JWT
            skipAuthorization: true,
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + idToken
            }
          }).then(function(response) {
            var idToken = response.data.result.content.token;
            setToken(idToken);
            $rootScope.$broadcast('tokenRefresh');

            return idToken;
          });
        } else {
          return idToken;
        }
      } else {
        return '';
      }
    }

    function getToken() {
      // the angular-store module takes care of the caching
      return store.get(auth0TokenName);
    }

    function setToken(token) {
      store.set(auth0TokenName, token);
    }

    function deleteToken() {
      store.remove(auth0TokenName);
    }

    function decodeToken() {
      var token = getToken();

      if (token) {
        return jwtHelper.decodeToken(token);
      }

      return {};
    }
  }
})();

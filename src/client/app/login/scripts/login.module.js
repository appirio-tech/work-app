/* jshint -W106 */
(function () {
  'use strict';

  angular.module('app.login', [
    'angular-storage',
    'angular-jwt',
    'app.constants'
  ]).config(JwtConfig);

  JwtConfig.$inject = ['$httpProvider', 'jwtInterceptorProvider'];

  function JwtConfig($httpProvider, jwtInterceptorProvider) {
    jwtInterceptor.$inject = ['jwtHelper', '$http', 'apiUrl'];

    function jwtInterceptor(jwtHelper, $http, apiUrl) {
      var idToken = localStorage.getItem('userJWTToken');

      if (idToken && idToken !== 'undefined') {
        if (jwtHelper.isTokenExpired(idToken)) {
          // This is a promise of a JWT id_token
          // @TODO put this in a service
          return $http({
            url: apiUrl + 'authorizations/1',
            // This makes it so that this request doesn't send the JWT
            skipAuthorization: true,
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + idToken
            }
          }).then(function(response) {
            var idToken = response.data.id_token;
            localStorage.setItem('userJWTToken', idToken);
            return idToken;
          });
        } else {
          return idToken;
        }
      } else {
        return '';
      }
    }

    jwtInterceptorProvider.tokenGetter = jwtInterceptor;

    $httpProvider.interceptors.push('jwtInterceptor');
  }
})();

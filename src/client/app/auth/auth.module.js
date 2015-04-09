/* jshint -W106 */
(function () {
  'use strict';

  angular
    .module('app.auth', [
      'angular-storage',
      'angular-jwt',
      'app.constants'
    ])
    .config(JwtConfig)
    .run(AuthResource);

  JwtConfig.$inject = ['$httpProvider', 'jwtInterceptorProvider'];

  function JwtConfig($httpProvider, jwtInterceptorProvider) {
    jwtInterceptor.$inject = ['TokenService'];

    function jwtInterceptor(TokenService) {
      return TokenService.refreshToken();
    }

    jwtInterceptorProvider.tokenGetter = jwtInterceptor;

    $httpProvider.interceptors.push('jwtInterceptor');
  }

  AuthResource.$inject = ['ApiResource'];

  function AuthResource(ApiResource) {
    var config = {
      url: 'authorizations',
      resource: 'auth'
    };

    ApiResource.add(config);
  }
})();

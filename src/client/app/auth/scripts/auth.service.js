(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$http', '$q', 'data', 'exception', 'auth', 'auth0retUrl', 'logger', 'TokenService', 'apiUrl'];
  /* @ngInject */
  function AuthService($http, $q, data, exception, auth, auth0retUrl, logger, TokenService, apiUrl) {
    var service = {
      login: login,
      logout: logout,
      authorize: authorize
    };
    return service;

    function logout() {
      return data.remove('auth')
        .then(logoutComplete)
        .catch(function (message) {
          exception.catcher(message.statusText)(message);
          $state.reload();
        });

      function logoutComplete(data, status, headers, config) {
        $state.reload();
        return data;
      }
    }

    /**
     * Trigger login
     * @param options
     * - username
     * - password
     * - retUrl: optional
     * - success:  success callback
     * - error: error callback
     */
    function login(options) {

      var defaultOptions = {
        retUrl: auth0retUrl
      };

      var lOptions = angular.extend({}, options, defaultOptions);

      logger.log(lOptions);
      auth.signin({
        username: lOptions.username,
        password: lOptions.password,
        connection: 'LDAP',
        response_type: 'code',
        authParams: {
          scope: 'openid profile offline_access',
          state: encodeURIComponent('retUrl='+window.location.href)
        }
      });
    }

    function authorize(auth0Token) {

      var deferred = $q.defer();

      var config = {
        method: 'POST',
        url: apiUrl + 'authorizations',
        data: {},
        headers: {
          Authorization: 'Auth0Code ' + auth0Token,
          state: encodeURIComponent('retUrl='+window.location.href)
        }
      };

      return $http(config)
        .success(function(data) {
          console.log(1);
          console.log(data);
          deferred.resolve(data.result.content.token);
        })
        .error(function(error) {
          console.log(error);
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
})();

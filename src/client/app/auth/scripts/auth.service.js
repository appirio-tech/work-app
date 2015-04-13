(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$http', '$q', 'data', 'exception', 'auth', 'auth0retUrl', 'logger', 'apiUrl', 'store', 'auth0TokenName', 'TokenService'];
  /* @ngInject */
  function AuthService($http, $q, data, exception, auth, auth0retUrl, logger, apiUrl, store, auth0TokenName, TokenService) {
    var service = {
      login: login,
      logout: logout,
      authorize: authorize,
      isAuthenticated: isAuthenticated
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
        TokenService.deleteToken();
        return data;
      }
    }

    /**
     * Trigger login
     * @param options
     * - username
     * - password
     * - retUrl: optional
     * - state:  an object containing formation to be based back
     * - error: error callback
     */
    function login(options) {

      // First remove any old tokens
      TokenService.deleteToken();

      var defaultOptions = {
        retUrl: auth0retUrl,
        error: options.error
      };

      var lOptions = angular.extend({}, options, defaultOptions);

      if (options.state) {
        store.set('login-state', options.state);
      }

      auth.signin({
        username: lOptions.username,
        password: lOptions.password,
        connection: 'LDAP',
        response_type: 'code',
        authParams: {
          scope: 'openid profile offline_access',
          state: encodeURIComponent('retUrl=' + defaultOptions.retUrl)
        }
      }, lOptions.success, lOptions.error);
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
    };

    /**
     * Check is a user is currently authenticated
     */
    function isAuthenticated() {
      //@TODO this should check if the auth library is really valid.
      var token = store.get(auth0TokenName);

      if (token && token !== 'undefined') {
        return true;
      }

      return false;
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['data', 'exception', 'auth', 'auth0retUrl', 'store', 'TokenService'];
  /* @ngInject */
  function AuthService(data, exception, auth, auth0retUrl, store, TokenService) {
    var service = {
      login: login,
      logout: logout
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
      });
    }
  }
})();

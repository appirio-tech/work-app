(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['data', 'exception', 'auth', 'auth0retUrl', 'logger', 'auth0callbackUrl'];
  /* @ngInject */
  function AuthService(data, exception, auth, auth0retUrl, logger, auth0callbackUrl) {
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
     * - success:  sucess callback
     * - error: error callback
     */
    function login(options) {

      var defaultOptions = {
        retUrl: auth0retUrl,
        success: function() { logger.info('login success')},
        error: function() {logger.info('error in login')}
      };

      var lOptions = angular.extend({}, defaultOptions, options);

      auth.signin({
        username: lOptions.username,
        password: lOptions.password,
        connection: 'LDAP',
        callbackURL: auth0callbackUrl,
        authParams: {
          scope: 'openid profile offline_access',
          state: encodeURIComponent('retUrl=' + lOptions.retUrl + '&setParam=true')
        }
      }, lOptions.success, lOptions.error);
    }
  }
})();

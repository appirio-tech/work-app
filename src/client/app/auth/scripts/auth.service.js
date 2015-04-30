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
      logout: logout,
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
     * - success:  success callback
     * - error: error callback
     */
    function login(options) {

      // First remove any old tokens
      TokenService.deleteToken();

      var defaultOptions = {
        retUrl: auth0retUrl,
        error: function() {},
        success: function(state) {}
      };

      var lOptions = angular.extend({}, options, defaultOptions);

      if (options.state) {
        store.set('login-state', options.state);
      }

      auth.signin({
        username: lOptions.username,
        password: lOptions.password,
        authParams: {
          scope: 'openid profile offline_access'
        }
      }, successFunction, lOptions.error);

      function successFunction(profile, idToken, accessToken, state, refreshToken) {
        var query = {
          params: {
            refreshToken: refreshToken,
            externalToken: idToken
          }
        };

        data.create('auth', query)
          .then(function(res) {
            // Save the token
            TokenService.setToken(res.result.content.token);
            // set the auth flag to true
            auth.isAuthenticated = true;
            lOptions.success(state);
          }).catch(function(e) {
            lOptions.error(e);
          });
      }
    }

    /**
     * Is there a current active session
     *
     * @return bool
     */
    function isAuthenticated() {
      return TokenService.tokenIsValid();
    }
  }
})();

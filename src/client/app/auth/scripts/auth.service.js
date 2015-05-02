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
      isAuthenticated: isAuthenticated,
      exchangeToken: exchangeToken,
      refreshToken: refreshToken
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
        auth.signout();
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
        retUrl: auth0retUrl
      };

      var lOptions = angular.extend({}, options, defaultOptions);

      if (options.state) {
        store.set('login-state', options.state);
      }

      auth.signin({
        username: lOptions.username,
        password: lOptions.password,
        sso: false,
        connection: 'LDAP',
        authParams: {
          scope: 'openid profile offline_access'
        }
      }, successFunction, errorFunction);

      function errorFunction(err) {
        options.error(err);
      }

      function successFunction(profile, idToken, accessToken, state, refreshToken) {
        TokenService.setAuth0Tokens(profile, idToken, accessToken, refreshToken);

        exchangeToken(idToken, refreshToken, options.success);
      }
    }

    /**
     * Exchange the Auth0 Token for the real one
     */
    function exchangeToken(idToken, refreshToken, success, error) {
      var query = {
        param: {
          refreshToken: refreshToken,
          externalToken: idToken
        }
      };

      data.create('auth', query)
        .then(function(res) {
          // Save the token
          TokenService.setToken(res.result.content.token);

          if (success) {
            success();
          }

        }).catch(function(e) {
          if (error) {
            error(e);
          }
        });
    }

    /**
     * Refresh the token with the API
     */
    function refreshToken() {
      data.get('auth', {id: 1}).then(function(data) {
        var newToken = data.result.content.token;

        TokenService.setToken(newToken);

        var tokens = TokenService.getAuth0Tokens();

        TokenService.setAuth0Tokens(
          tokens.profile,
          newToken,
          tokens.accessToken,
          tokens.refreshToken
        );

        auth.authenticate(tokens.profile, newToken);
      });
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

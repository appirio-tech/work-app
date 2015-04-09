(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['data', 'exception'];
  /* @ngInject */
  function AuthService(data, exception) {
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

    function login() {
      
    }
  }
})();

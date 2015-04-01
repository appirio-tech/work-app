(function () {
  'use strict';

  angular
    .module('app.login')
    .factory('LoginService', LoginService);

  LoginService.$inject = ['$q', '$http', '$location', '$state', '$window', 'exception', 'logger', 'apiUrl'];
  /* @ngInject */
  function LoginService($q, $http, $location, $state, $window, exception, logger, apiUrl) {
    var service = {
      getUser: getUser,
      logout: logout
    };
    return service;

    function getUser(id) {
      return $http.get(apiUrl + 'users/' + id)
        .then(getUserComplete)
        .catch(function (message) {
          exception.catcher('XHR Failed for getUser')(message);
        });

      function getUserComplete(data, status, headers, config) {
        var user = data.data.result.content;
        console.log('user : ' + user);
        return user;
      }
    }

    function logout() {
      return $http.delete(apiUrl + 'authorizations/')
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
  }
})();

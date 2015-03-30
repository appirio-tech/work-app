(function () {
  'use strict';

  angular
    .module('app.login')
    .factory('LoginService', LoginService);

  LoginService.$inject = ['$q', '$http', '$location', 'exception', 'logger', 'apiUrl'];
  /* @ngInject */
  function LoginService($q, $http, $location, exception, logger, apiUrl) {
    var ob = {
      getUser: getUser,
      logout: logout
    };
    return ob;

    function getUser(id) {
      return $http.get(apiUrl + 'users/' + id)
        .then(getUserComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getUser')(message);
          $location.url('/');
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
          .catch(function(message) {
            exception.catcher('XHR Failed for logout')(message);
            $location.url('/');
          });

        function logoutComplete(data, status, headers, config) {
          $location.url('/');
        }
      }
  }
})();

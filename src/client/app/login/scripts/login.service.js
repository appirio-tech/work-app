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
      return $http.get('http://api.topcoder-dev.com'+apiUrl + 'users/' + id, {
        headers: {'Authorization': 'Bearer '+localStorage.getItem('userJWTToken')}
      })
        .then(getUserComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getUser')(message);
          $location.url('/');
        });

      function getUserComplete(data, status, headers, config) {
        //logger.info('user data', data);
        var user = data.data.result.content;
        return user;
      }
    }
    
    function logout() {
        return $http.delete('http://api.topcoder-dev.com'+apiUrl + 'authorizations/', {
    	  headers: {'Authorization': 'Bearer '+localStorage.getItem('userJWTToken')}
        })
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

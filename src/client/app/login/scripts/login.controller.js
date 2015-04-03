/*global form:true */
(function () {
  'use strict';

  angular.module('app.login').controller('LoginController', LoginController);

  LoginController.$inject = ['$state', '$scope','$location', 'LoginService', 'logger', 'auth0ClientId', 'auth0Domain', 'retUrl', 'callbackUrl', 'jwtHelper'];
  /* @ngInject */
  function LoginController($state, $scope, $location, LoginService, logger, auth0ClientId, auth0Domain, retUrl, callbackUrl, jwtHelper) {
    var vm = this;
    vm.title = 'Login';
    vm.loggedInUser = '';

    // auth0 login form
    var lock = new Auth0Lock(auth0ClientId, auth0Domain);
    $scope.signin = function () {
      var state = encodeURIComponent('retUrl=' + retUrl + '&setParam=true');
      lock.show({
        callbackURL: callbackUrl,
        responseType: 'code',
        connections: ['LDAP'],
        authParams: {
          scope: 'openid profile offline_access',
          state: state
        },
        usernameStyle: 'username'
      });
    };

    $scope.signout = function () {
      var promise = LoginService.logout();
      promise.then(function (response) {
        if (200 == response.status) {
          vm.loggedInUser = '';
        }
        localStorage.removeItem('userJWTToken');
        $state.reload();
      });
    };

    activate();

    function activate() {
      logger.log('Activated Login View');

      //set parameter passed JWT token and remove if any.
      var userJWTToken = getParameterByName('userJWTToken');
      //logger.info("userJWTToken : " +userJWTToken);
      if (userJWTToken && localStorage) {
        localStorage.setItem('userJWTToken', userJWTToken);
        decodeJwt();
        $location.search('userJWTToken', null);
      }
    }

    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.hash);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function decodeJwt() {
      var idToken = localStorage.getItem('userJWTToken');

      if (idToken && idToken !== 'undefined') {
        var decoded = jwtHelper.decodeToken(idToken);
        if (decoded && decoded.userId) {
          var promise = LoginService.getUser(decoded.userId);
          promise.then(function (data) {
            vm.loggedInUser = data.handle;
          });
        }
      }
    }
  }
})();

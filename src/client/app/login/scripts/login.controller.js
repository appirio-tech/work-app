/*global form:true */
(function () {
  'use strict';

  angular.module('app.login').controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$http', 'auth', '$location', 'store', 'LoginService', 'logger', 'auth0ClientId', 'auth0Domain', 'retUrl', 'callbackUrl', 'jwtHelper'];
  /* @ngInject */
  function LoginController($scope, $http, auth, $location, store, LoginService, logger, auth0ClientId, auth0Domain, retUrl, callbackUrl, jwtHelper) {
    var vm = this;
    vm.title = 'Login';
    vm.loggedInUser = '';

    // auth0 login form
    var lock = new Auth0Lock(auth0ClientId, auth0Domain);
    $scope.signin = function () {
      var state = encodeURIComponent('retUrl=' + retUrl);
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
        $location.url('/');
      });
    };

    activate();

    function activate() {
      logger.info('Activated Login View');

      decodeJwt();

      //set parameter passed JWT token and remove if any.
      var userJWTToken = getParameterByName('userJWTToken')
      //logger.info("userJWTToken : " +userJWTToken);
      if (userJWTToken && localStorage) {
        localStorage.setItem('userJWTToken', userJWTToken);
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + userJWTToken;
        var clean_uri = location.protocol + "//" + location.host + location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
      }
    }

    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.hash);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function decodeJwt() {
      var decoded = jwtHelper.decodeToken(localStorage.getItem("userJWTToken"));
      if (decoded && decoded.userId) {
        var promise = LoginService.getUser(decoded.userId);
        promise.then(function (data) {
          vm.loggedInUser = data.handle;
        });
      }
    }
  }
})();

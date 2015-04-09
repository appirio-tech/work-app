/*global form:true, Auth0Lock:true */
(function () {
  'use strict';

  angular.module('app.auth')
    .controller('AuthController', CallbackController);

  CallbackController.$inject = ['$scope', 'AuthService'];

  /* @ngInject */
  function CallbackController($scope, AuthService) {
    var vm = this;

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
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
          results = regex.exec(location.hash);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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

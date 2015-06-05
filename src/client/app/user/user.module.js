(function () {
  'use strict';

  angular
    .module('app.user', [
      'blocks.exception', 'blocks.logger',
      'app.resource',
      'app.constants',
      'app.auth'
    ])
    .run(UserModule);

  UserModule.$inject = ['$rootScope', 'ApiResource', 'TokenService', 'UserService'];

  function UserModule($rootScope, ApiResource, TokenService, UserService) {
    var config = {
      url: 'users',
      resource: 'user'
    };

    ApiResource.add(config);

    function LoginComplete() {
      var decodedToken = TokenService.decodeToken();
      if (decodedToken.userId) {
        UserService.getUser(decodedToken.userId);
      }
    }

    function LogOutComplete() {
      UserService.removeUser();
    }

    // Update User Service on login
    //$rootScope.$on('authenticated', LoginComplete);

    // Remove user object
    $rootScope.$on('logout', LogOutComplete);
  }
})();

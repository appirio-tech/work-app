(function () {
  'use strict';

  angular
    .module('app.user', [
      'blocks.exception', 'blocks.logger',
      'app.resource',
      'app.constants',
      'app.auth'
    ])
    .run(WorkRequest);

  WorkRequest.$inject = ['$rootScope', 'ApiResource', 'TokenService', 'UserService'];

  function WorkRequest($rootScope, ApiResource, TokenService, UserService) {
    var config = {
      url: 'user',
      resource: 'user'
    };

    ApiResource.add(config);

    LoginComplete.$inject = ['UserService', 'decodedToken'];

    function LoginComplete() {
      var decodedToken = TokenService.decodeToken();
      if (decodedToken.userId) {
        UserService.setUser(decodedToken.userId);
      }
    }

    // Update User Service on login
    $rootScope.$on('$locationChangeStart', LoginComplete);
  }
})();

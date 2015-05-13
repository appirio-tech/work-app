(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['data', 'logger', 'TokenService'];
  /* @ngInject */
  function UserService(data, logger, TokenService) {
    var service = {
      getUser: null,
      user: null,
      removeUser: null,
      getCurrentUser: null
    };

    service.getCurrentUser = function() {
      var decodedToken = TokenService.decodeToken();
      if (decodedToken.userId) {
        return service.getUser(decodedToken.userId);
      }
    };

    service.removeUser = function() {
      service.user = null;
    };

    service.getUser = function(id) {
      var promise = data.get('user', {id: id});

      promise.then(getUserComplete);
      promise.catch(userError);

      return promise;

      function getUserComplete(data) {
        service.user = data.result.content;
      }

      function userError(error) {
        logger.log(error);
      }
    };

    return service;
  }
})();

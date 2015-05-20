(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['$q', 'data', 'logger', 'TokenService'];
  /* @ngInject */
  function UserService($q, data, logger, TokenService) {
    var service = {
      getUser: null,
      user: null,
      removeUser: null,
      getCurrentUser: null
    };

    service.getCurrentUser = function() {
      var deferred = $q.defer();
      var decodedToken = TokenService.decodeToken();

      if (decodedToken.userId) {
        service.getUser(decodedToken.userId).then(function(data) {
          if (data && data.result) {
            deferred.resolve(data.result.content);
          } else {
            deferred.reject('API Issue');
          }
        });
      } else {
        deferred.reject('No User Id');
      }

      return deferred.promise;
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

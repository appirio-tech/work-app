(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['data', 'logger'];
  /* @ngInject */
  function UserService(data, logger) {
    var service = {
      getUser: null,
      user: null,
      setUser: null
    };

    service.setUser = function(id) {
      getUser(id)
        .then(function(data) {
          service.user = data;
        });
    };

    service.getUser = function(id) {
      if (service.user) {
        return service.user;
      }

      var promise = data.get('user', {id: id});

      promise.then(getUserComplete);
      promise.catch(userError);

      return promise;

      function getUserComplete(data) {
        service.user = content;
        return data.data.result.content;
      }

      function userError(error) {
        logger.log(error);
      }
    };

    return service;
  }
})();

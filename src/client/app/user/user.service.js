(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['data', 'logger'];
  /* @ngInject */
  function UserService(data, logger) {
    var service = {
      getUser: getUser,
      user: user,
      setUser: setUser
    };

    var user;

    return service;

    function setUser(id) {
      getUser(id)
        .then(function(data) {
          service.user = data;
        });
    }

    function getUser(id) {
      if (service.user) {
        return user;
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
    }
  }
})();

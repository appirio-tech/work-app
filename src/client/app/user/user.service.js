(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['data'];
  /* @ngInject */
  function UserService(data) {
    var service = {
      getUser: getUser,
      user: user
    };
    return service;

    var user;

    function getUser(id) {
      if (service.user) {
        return user;
      }

      var promise = data.get('work', {id: id});

      promise.resolve(getUserComplete);

      return promise;

      function getUserComplete(data) {
        service.user = content;
        return data.data.result.content;
      }
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['$q', 'data', 'exception'];
  /* @ngInject */
  function UserService($q, data, exception) {
    var service = {
      getUser: getUser
    };
    return service;

    function getUser(id) {
      var promise = data.get('work', {id: id});

      promise.resolve(getUserComplete);

      return promise;

      function getUserComplete(data) {
        return data.data.result.content;
      }
    }
  }
})();

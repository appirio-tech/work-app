(function () {
  'use strict';

  angular
    .module('app.manage')
    .factory('ManageService', ManageService);

  ManageService.$inject = ['$q', 'data'];
  /* @ngInject */
  function ManageService($q, data) {

    var service = {

      // functions
      getWorkRequests: null,

    };

    service.getWorkRequests = function() {
      var deferred = $q.defer();
      data.get('work-request').then(function(data) {
        var requests = data.result.content;
        if (Array.isArray(requests)) {
          requests.reverse();
        } else {
          requests = [];
        }
        deferred.resolve(requests);
      });
      return deferred.promise;
    };

    return service;

  }
})();

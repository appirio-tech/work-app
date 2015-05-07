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
      getWorkRequests        : null,
      formatWorkRequests     : null,
      getDisplayWorkRequests : null

    };

    var statusClasses = {
      'Incomplete': 'incomplete',
      'Submitted' : 'submitted'
    };
    var statusMessages = {
      'Incomplete': 'PROJECT SUBMISSION INCOMPLETE',
      'Submitted' : 'PROJECT SUBMITTED'
    };
    var statusActions = {
      'Incomplete': '<a>Continue setup</a>',
      'Submitted' : 'Waiting for Project Approval'
    };
    var checkmarks = {
      'Submitted': 'check-solid-blue.svg',
    };
    var typeDisplays = {
      'design': 'Mobile: Design',
      'code'  : 'Mobile: Code',
      'design & code': 'Design & Code'
    };

    service.getWorkRequests = function() {
      var deferred = $q.defer();
      data.get('work-request').then(function(data) {
        deferred.resolve(data.result.content);
      });
      return deferred.promise;
    };

    service.formatWorkRequests = function(requests) {
      return requests.map(function(work) {
        work.status      = work.status || 'Incomplete';
        work.class       = statusClasses[work.status];
        work.message     = statusMessages[work.status];
        work.action      = statusActions[work.status];
        work.checkmark   = checkmarks[work.status];
        work.requestType = typeDisplays[work.requestType];
        return work;
      });
    };

    service.getDisplayWorkRequests = function() {
      var deferred = $q.defer();
      service.getWorkRequests().then(function(requests) {
        deferred.resolve(service.formatWorkRequests(requests));
      });
      return deferred.promise;
    };

    return service;

  }
})();

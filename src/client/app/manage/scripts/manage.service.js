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
      getDisplayWorkRequests: null

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
      var ans = data.get('work-request', params).result.content;
      return ans;
    };

    service.getDisplayWorkRequests = function(params) {
      return service.getWorkRequests(params).map(function(work) {
        work.status = work.status || 'Incomplete';
        work.class   = statusClasses[work.status];
        work.message = statusMessages[work.status];
        work.action  = statusActions[work.status];
        work.checkmark = checkmarks[work.status];
        work.requestType = typeDisplays[work.requestType];
        return work;
      });
    };

    return service;

  }
})();

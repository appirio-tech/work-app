(function () {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController);

  ManageController.$inject = ['logger', 'workRequests', '$location'];
  /* @ngInject */
  function ManageController(logger, workRequests, $location) {
    var vm = this;
    vm.title = 'Work Requests';
    vm.workRequests = [];
    vm.newProject = null;
    vm.formatWorkRequests = null;

    vm.activate = function() {
      logger.info('Activated Work Request Single View');
      vm.workRequests = vm.formatWorkRequests(workRequests);
    }

    vm.formatWorkRequests = function(requests) {
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

    vm.newProject = function() {
      $location.url('submit-work');
    };

    vm.activate();

  }
})();

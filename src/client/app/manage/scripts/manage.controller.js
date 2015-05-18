(function () {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController);

  ManageController.$inject = ['logger', 'workRequests', '$state', 'work'];
  /* @ngInject */
  function ManageController(logger, workRequests, $state, work) {
    var vm = this;
    vm.title = 'Work Requests';
    vm.workRequests = [];
    vm.newProject = null;
    vm.formatWorkRequests = null;
    vm.go = null;
    vm.showMessage = false;

    vm.activate = function() {
      logger.info('Activated Work Request Single View');
      vm.workRequests = vm.formatWorkRequests(workRequests);
      if (work) {
        vm.showMessage = true;
      }
    };

    vm.formatWorkRequests = function(requests) {
      var statusClasses = {
        'Incomplete': 'incomplete',
        'Submitted' : 'submitted'
      };
      var statusMessages = {
        'Incomplete': 'PROJECT SUBMISSION INCOMPLETE',
        'Submitted' : 'PROJECT SUBMITTED'
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
        work.checkmark   = checkmarks[work.status];
        work.requestType = typeDisplays[work.requestType];
        return work;
      });
    };

    vm.newProject = function() {
      $state.go('submit-work.flow');
    };

    vm.go = function(project) {
      if (project.status == 'Submitted') {
        $state.go('timeline', { workId: project.id } );
      } else {
        $state.go('submit-work.flow');
      }
    };

    vm.activate();

  }
})();

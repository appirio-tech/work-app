(function () {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController);

  ManageController.$inject = ['logger', 'workRequests', '$state', '$stateParams'];
  /* @ngInject */
  function ManageController(logger, workRequests, $state, $stateParams) {
    var vm = this;
    vm.title = 'Work Requests';
    vm.workRequests = [];
    vm.newProject = null;
    vm.formatWorkRequests = null;
    vm.go = null;
    vm.showMessage = $stateParams.saved

    vm.activate = function() {
      logger.info('Activated Work Request Single View');
      vm.workRequests = vm.formatWorkRequests(vm.workRequests.concat(workRequests));
    };

    vm.formatWorkRequests = function(requests) {
      var statusClasses = {
        'Incomplete': 'incomplete',
        'Submitted' : 'submitted',
        'Assigned'  : 'assigned',
        'Estimate'  : 'estimate',
        'Launched'  : 'launched',
        'Messaged'  : 'messaged'
      };
      var statusMessages = {
        'Incomplete': 'PROJECT SUBMISSION INCOMPLETE',
        'Submitted' : 'PROJECT SUBMITTED',
        'Assigned'  : 'COPILOT ASSIGNED',
        'Estimate'  : 'PROJECT APPROVED!',
        'Launched'  : 'PROJECT LAUNCHED',
        'Messaged'  : 'PROJECT LAUNCHED'
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
        if (work.status == 'Assigned' || work.status == 'Estimate' || work.status == 'Launched' || work.status == 'Messaged') {
          work.avatar = true;
        }
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

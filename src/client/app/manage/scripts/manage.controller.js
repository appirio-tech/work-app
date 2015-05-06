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
    logger.info('work requests', workRequests);
    vm.workRequests = [];
    vm.newProject = null;

    activate();

    function activate() {
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
      logger.info('Activated Work Request Single View');
      vm.workRequests = workRequests.result.content.map(function(x) {
        x.status = x.status || 'Incomplete';
        x.class   = statusClasses[x.status];
        x.message = statusMessages[x.status];
        x.action  = statusActions[x.status];
        x.checkmark = checkmarks[x.status];
        x.requestType = typeDisplays[x.requestType];
        return x;
      });
    }
    vm.newProject = function() {
      $location.url('submit-work');
    };
  }
})();

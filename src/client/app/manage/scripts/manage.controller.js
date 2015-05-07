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
    vm.workRequests = workRequests;
    vm.newProject = null;

    activate();

    function activate() {
      logger.info('Activated Work Request Single View');
    }

    vm.newProject = function() {
      $location.url('submit-work');
    };

  }
})();

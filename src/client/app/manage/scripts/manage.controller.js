(function () {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController);

  ManageController.$inject = ['logger', 'workRequests'];
  /* @ngInject */
  function ManageController(logger, workRequests) {
    var vm = this;
    vm.title = 'Work Requests';
    logger.info('work requests', workRequests);
    vm.workRequests = workRequests.result.content;

    activate();

    function activate() {
      logger.info('Activated Work Request Single View');
    }
  }
})();

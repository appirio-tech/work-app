(function () {
  'use strict';

  angular
    .module('app.view-work')
    .controller('ViewWorkMultiController', ViewWorkMultiController);

  ViewWorkMultiController.$inject = ['logger', 'workRequests'];
  /* @ngInject */
  function ViewWorkMultiController(logger, workRequests) {
    var vm = this;
    vm.title = 'Work Requests';
    logger.info("work requests", workRequests);
    vm.workRequests = workRequests.result.content;

    activate();

    function activate() {
      logger.info('Activated Work Request Single View');
    }
  }
})();

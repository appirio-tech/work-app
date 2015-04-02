(function () {
  'use strict';

  angular
    .module('app.view-work')
    .controller('ViewWorkSingleController', ViewWorkSingleController);

  ViewWorkSingleController.$inject = ['logger', 'workRequest'];
  /* @ngInject */
  function ViewWorkSingleController(logger, workRequest) {
    var vm = this;
    vm.workRequest = workRequest.result.content;
    vm.title = workRequest.title;

    activate();

    function activate() {
      logger.info('Activated Work Request Single View');
    }
  }
})();

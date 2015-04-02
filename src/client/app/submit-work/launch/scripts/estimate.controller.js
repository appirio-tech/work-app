/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitEstimateController(logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Estimate';
    vm.work = {};
    vm.estimate = '$8,000 - $10,000';
    vm.termsAccepted = false;
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Estimate View');
      vm.work = SubmitWorkService.getCurrent();
    }

    function next() {
      if (vm.termsAccepted) SubmitWorkService.next('success')();
    }

  }
})();

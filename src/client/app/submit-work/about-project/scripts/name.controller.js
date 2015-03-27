/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitNameController', SubmitNameController);

  SubmitNameController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitNameController(logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Name';
    vm.workRequest = {};
    vm.next = SubmitWorkService.next('about-type');

    activate();

    function activate() {
      logger.info('Activated Name View');
      vm.workRequest = SubmitWorkService.getCurrent();
    }

  }
})();

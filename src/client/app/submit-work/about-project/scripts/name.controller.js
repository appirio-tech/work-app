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
    vm.project = {};
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Name View');
      vm.project = SubmitWorkService.getCurrent();
    }

    function next() {
      $state.go('about-type')
    }
  }
})();

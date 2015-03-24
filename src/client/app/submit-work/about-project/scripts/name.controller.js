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
    vm.name = '';
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Name View');
    }

    function next() {
      SubmitWorkService.setName(vm.name);
      $state.go('about-type')
    }
  }
})();

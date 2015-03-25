/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitTypeController', SubmitTypeController);

  SubmitTypeController.$inject = ['logger', 'SubmitWorkService', '$state'];
  /* @ngInject */
  function SubmitTypeController(logger, SubmitWorkService, $state) {
    var vm = this;
    vm.title = 'Type';
    vm.type = false;
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Type View');
    }

    function next() {
      SubmitWorkService.setType(vm.type);
      $state.go('about-brief');
    }
  }
})();

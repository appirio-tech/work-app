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
    vm.work = {};
    vm.validate = validate;

    activate();

    function activate() {
      logger.info('Activated Name View');
      vm.work = SubmitWorkService.getCurrent();
    }

    function validate() {
      return SubmitWorkService.validateName(vm.work.name);
    }

  }
})();

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
    vm.nextState = 'type';

    activate();

    function activate() {
      logger.log('Activated Name View');
      vm.work = SubmitWorkService.getCurrent();
    }

  }
})();

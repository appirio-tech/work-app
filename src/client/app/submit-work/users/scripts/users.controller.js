/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitUsersController', SubmitUsersController);

  SubmitUsersController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitUsersController(logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Users';
    vm.work = {};
    vm.next = false;
    vm.validate = validate;
    vm.nextState = 'features';

    activate();

    function activate() {
      logger.log('Activated Users View');
      vm.work = SubmitWorkService.work;
    }

    function validate() {
      return SubmitWorkService.validateUsageDescription(vm.work.usageDescription);
    }

  }
})();

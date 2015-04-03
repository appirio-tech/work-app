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
    vm.nextState = 'features';

    activate();

    function activate() {
      logger.log('Activated Users View');
      vm.work = SubmitWorkService.getCurrent();
    }

  }
})();

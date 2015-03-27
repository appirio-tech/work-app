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
    vm.usersDescription = '';
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Users View');
    }

    function next() {
      SubmitWorkService.getCurrent().usersDescription = vm.usersDescription;
      $state.go('features');
    }
  }
})();

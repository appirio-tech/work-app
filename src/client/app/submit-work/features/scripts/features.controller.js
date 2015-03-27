/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitFeaturesController', SubmitFeaturesController);

  SubmitFeaturesController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitFeaturesController(logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Features';
    vm.usersDescription = '';
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Features View');
    }

    function next() {
      SubmitWorkService.getCurrent().usersDescription = vm.usersDescription;
      $state.go('features');
    }
  }
})();

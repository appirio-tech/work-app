/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitDesignsController', SubmitDesignsController);

  SubmitDesignsController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitDesignsController(logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Designs';
    vm.work = {};
    vm.next = SubmitWorkService.next('launch-estimate');

    activate();

    function activate() {
      logger.info('Activated Designs View');
      vm.work = SubmitWorkService.getCurrent();
    }

  }
})();

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
    vm.work = {};
    vm.next = SubmitWorkService.next('estimate');

    activate();

    function activate() {
      logger.info('Activated Features View');
      vm.work = SubmitWorkService.getCurrent();
    }

  }
})();

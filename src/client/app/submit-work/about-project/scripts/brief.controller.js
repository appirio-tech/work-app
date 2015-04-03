/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitBriefController', SubmitBriefController);

  SubmitBriefController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitBriefController(logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Brief';
    vm.project = {};
    vm.briefFilename = '';
    vm.nextState = 'competitors';

    activate();

    function activate() {
      logger.log('Activated Brief View');
      vm.project = SubmitWorkService.getCurrent();
    }

  }
})();

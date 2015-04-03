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
    vm.work = {};
    vm.select = select;
    vm.designButtonStyle = '';
    vm.codeButtonStyle = '';
    vm.bothButtonStyle = '';
    vm.nextState = 'elevator-pitch';

    activate();

    function activate() {
      logger.info('Activated Type View');
      vm.work = SubmitWorkService.getCurrent();
    }

    function select(type) {
      vm.work.requestType = type;
      switch (type) {
        case 'design':
          vm.designButtonStyle = 'selected';
          vm.codeButtonStyle = '';
          vm.bothButtonStyle = '';
          break;
        case 'code':
          vm.designButtonStyle = '';
          vm.codeButtonStyle = 'selected';
          vm.bothButtonStyle = '';
          break;
        case 'both':
          vm.designButtonStyle = '';
          vm.codeButtonStyle = '';
          vm.bothButtonStyle = 'selected';
          break;
      }
    }

  }
})();

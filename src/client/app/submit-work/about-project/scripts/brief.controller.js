/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitBriefController', SubmitBriefController);

  SubmitBriefController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitBriefController(logger, $state, SubmitWorkService) {
    var vm           = this;
    vm.title         = 'Brief';
    vm.work          = {};
    vm.briefFilename = '';
    vm.nextState     = 'competitors';
    vm.showYesNo     = true;
    vm.showBrief     = false;
    vm.showElevator  = false;
    vm.validate      = validate;
    vm.toggleYes     = toggleYes;
    vm.toggleNo = toggleNo;
    vm.toggleCancel = toggleCancel;
      
    activate();

    function toggleYes() {
      vm.showYesNo    = false;
      vm.showBrief    = true;
      vm.showElevator = false;
    }

    function toggleNo() {
      vm.showYesNo    = false;
      vm.showBrief    = false;
      vm.showElevator = true;
    }

    function toggleCancel() {
      vm.showYesNo    = true;
      vm.showBrief    = false;
      vm.showElevator = false;
    }

    function activate() {
      logger.log('Activated Brief View');
      vm.work = SubmitWorkService.getCurrent();
    }

    function validate() {
      return SubmitWorkService.validateSummary(vm.work.summary);
    }

  }
})();

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
    vm.project       = {};
    vm.briefFilename = '';
    vm.nextState     = 'competitors';
    vm.showYesNo     = true;
    vm.showBrief     = false;
    vm.showElevator  = false;

    vm.toggleYes = function () {
      vm.showYesNo    = false;
      vm.showBrief    = true;
      vm.showElevator = false;
    }

    vm.toggleNo = function () {
      vm.showYesNo    = false;
      vm.showBrief    = false;
      vm.showElevator = true;
    }

    vm.toggleCancel = function () {
      vm.showYesNo    = true;
      vm.showBrief    = false;
      vm.showElevator = false;
    }

    activate();

    function activate() {
      logger.log('Activated Brief View');
      vm.project = SubmitWorkService.getCurrent();
    }

  }
})();

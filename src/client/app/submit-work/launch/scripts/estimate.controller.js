/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['logger', '$state', 'SubmitWorkService', '$anchorScroll', '$location'];
  /* @ngInject */
  function SubmitEstimateController(logger, $state, SubmitWorkService, $anchorScroll, $location) {
    var vm = this;
    vm.title = 'Estimate';
    vm.work = {};
    vm.estimate = '$8,000 - $10,000';
    vm.termsAccepted = false;
    vm.launch = launch;

    activate();

    function activate() {
      logger.info('Activated Estimate View');
      vm.work = SubmitWorkService.getCurrent();
    }

    function launch() {
      var validateResult = SubmitWorkService.globalValidate();
      if (vm.termsAccepted && validateResult.valid) {
        SubmitWorkService.next('launch-success')(); 
      } else {
        if (!validateResult.name) {
          $location.hash('name-your-project').replace();
          $anchorScroll('name-your-project');
        } else if (!validateResult.summary) {
          $location.hash('project-elevator-pitch').replace();
          $anchorScroll('project-elevator-pitch');
        } else if (!validateResult.usageDescription) {
          $location.hash('your-app-users').replace();
          $anchorScroll('your-app-users');
        }
      }
    }

  }
})();

/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['logger', '$state', 'SubmitWorkService', '$document'];
  /* @ngInject */
  function SubmitEstimateController(logger, $state, SubmitWorkService, $document) {
    var vm = this;
    vm.title = 'Estimate';
    vm.work = {};
    vm.estimate = '$8,000 - $10,000';
    vm.termsAccepted = false;
    vm.launch = launch;
    vm.nextState = 'success';

    activate();

    function activate() {
      logger.log('Activated Estimate View');
      vm.work = SubmitWorkService.getCurrent();
    }

    function launch() {
      var validateResult = SubmitWorkService.globalValidate();
      console.log(validateResult);
      if (vm.termsAccepted && validateResult.valid) {
        SubmitWorkService.next('launch-success')();
      } else {
        var state = '';
        if (!validateResult.name) {
          state = 'name';
        } else if (!validateResult.summary) {
          state = 'elevator-pitch';
        } else if (!validateResult.usageDescription) {
          state = 'users';
        }
        var stateElement = angular.element('[ng-scroll-state="submit-work"] [state="' + state + '"]');
        $document.scrollToElementAnimated(stateElement, 150);
      }
    }

  }
})();

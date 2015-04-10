/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['$rootScope', 'logger', '$state', 'SubmitWorkService', '$document'];
  /* @ngInject */
  function SubmitEstimateController($rootScope, logger, $state, SubmitWorkService, $document) {
    var vm = this;
    vm.title = 'Estimate';
    vm.work = {};
    vm.termsAccepted = false;
    vm.launch = launch;
    vm.nextState = 'success';
    vm.getPrice = SubmitWorkService.getPrice;

    vm.showTerms = function () {
      $rootScope.$emit('submit-work-show-example', 'terms');
    };

    vm.hideTerms = function () {
      $rootScope.$emit('submit-work-hide-example');
    };

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
          state = 'brief';
        } else if (!validateResult.usageDescription) {
          state = 'users';
        }
        var stateElement = angular.element('[ng-scroll-state="submit-work"] [state="' + state + '"]');
        $document.scrollToElementAnimated(stateElement, 150);
      }
    }

  }
})();

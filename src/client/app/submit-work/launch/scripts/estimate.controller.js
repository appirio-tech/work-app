(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['$scope', 'logger', 'SubmitWorkService', 'NavService'];

  function SubmitEstimateController($scope, logger, SubmitWorkService, NavService) {
    var vm         = this;
    vm.title       = 'Estimate';
    vm.work        = SubmitWorkService.work;
    vm.getEstimate = SubmitWorkService.getEstimate;
    vm.showTerms   = false;
    vm.change;

    $scope.$watch('estimateForm', function(estimateForm) {
      if (estimateForm) {
        NavService.findState('estimate').form = estimateForm;
      }
    });

    // Hide terms when no longer on estimate
    $scope.$watch(function () {
       return NavService.activeState;
     }, function (activeState) {
      if (activeState != 'estimate') {
        vm.showTerms = false;
      }
    }, true);

    // Mark completed when terms is accepted
    vm.change = function () {
      NavService.setActiveState('estimate');
    };
  }
})();

(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['$scope', 'logger', 'SubmitWorkService'];

  function SubmitEstimateController($scope, logger, SubmitWorkService) {
    var vm = this;
    vm.title = 'Estimate';
    vm.work = SubmitWorkService.work;
    vm.getEstimate = SubmitWorkService.getEstimate;

    $scope.showTerms = false;

    logger.log('Activated Estimate View');

    $scope.$watch('estimateForm', function(estimateForm) {
      if (estimateForm) {
        SubmitWorkService.findState('estimate').form = estimateForm;
      }
    });

    // Hide terms when no longer on estimate
    $scope.$watch(function () {
       return SubmitWorkService.activeState;
     }, function (activeState) {
      if (activeState != 'estimate') {
        $scope.showTerms = false;
      }
    }, true);

    // Mark completed when terms is accepted
    $scope.change = function () {
      SubmitWorkService.setActiveState('estimate');
    };
  }
})();

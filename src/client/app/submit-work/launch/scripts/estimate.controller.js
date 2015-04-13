/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitEstimateController($scope, logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Estimate';
    vm.work = SubmitWorkService.work;
    vm.termsAccepted = false;
    vm.nextState = 'success';
    vm.getEstimate = SubmitWorkService.getEstimate;

    logger.log('Activated Estimate View');

    $scope.$watch('estimateForm', function(estimateForm) {
      if (estimateForm) {
        SubmitWorkService.findState('estimate').form = estimateForm;
      }
    });

    $scope.change = function () {
      // Force to save/update completed
      SubmitWorkService.setActiveState('estimate');
    };
  }
})();

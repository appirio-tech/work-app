/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitEstimateController', SubmitEstimateController);

  SubmitEstimateController.$inject = ['$scope', 'logger', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitEstimateController($scope, logger, SubmitWorkService) {
    var vm      = this;
    vm.title    = 'Estimate';
    vm.work     = SubmitWorkService.work;
    vm.getPrice = SubmitWorkService.getPrice;

    logger.log('Activated Estimate View');

    $scope.$watch('estimateForm', function(estimateForm) {
      if (estimateForm) {
        SubmitWorkService.findState('estimate').form = estimateForm;
      }
    });
  }
})();

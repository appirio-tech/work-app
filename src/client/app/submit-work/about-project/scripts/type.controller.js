/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitTypeController', SubmitTypeController);

  SubmitTypeController.$inject = ['$scope', 'logger', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitTypeController($scope, logger, SubmitWorkService) {
    var vm   = this;
    vm.title = 'Type';
    vm.work  = SubmitWorkService.work;

    activate();

    function activate() {
      logger.log('Activated Type View');
      vm.work = SubmitWorkService.work;
    }

    $scope.$watch('typeForm', function(typeForm) {
      if (typeForm) {
        SubmitWorkService.findState('type').form = typeForm;
      }
    });

    $scope.submit = function () {
      if ($scope.typeForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };
  }
})();

(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitTypeController', SubmitTypeController);

  SubmitTypeController.$inject = ['$scope', 'logger', 'SubmitWorkService', 'NavService'];

  function SubmitTypeController($scope, logger, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Type';
    vm.work  = SubmitWorkService.work;
    vm.setType;
    vm.submit;

    activate();

    function activate() {
      logger.log('Activated Type View');
      vm.work = SubmitWorkService.work;
    }

    vm.setType = function (e, type) {
      e.target.focus();
      vm.work.requestType = type;
    }

    $scope.$watch('typeForm', function(typeForm) {
      if (typeForm) {
        NavService.findState('type').form = typeForm;
      }
    });

    vm.submit = function () {
      if ($scope.typeForm.$valid) {
        NavService.setNextState();
      }
    };
  }
})();

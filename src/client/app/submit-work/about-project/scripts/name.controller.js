/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitNameController', SubmitNameController);

  SubmitNameController.$inject = ['$scope', 'logger', 'SubmitWorkService'];

  function SubmitNameController($scope, logger, SubmitWorkService) {
    var vm          = this;
    vm.title        = 'Name';
    vm.work         = SubmitWorkService.work;
    vm.setNextState = SubmitWorkService.setNextState

    activate();

    $scope.$watch('nameForm', function(nameForm) {
      if (nameForm) {
        SubmitWorkService.findState('name').form = nameForm;
      }
    });

    function activate() {
      logger.log('Activated Name View');
    }
  }
})();

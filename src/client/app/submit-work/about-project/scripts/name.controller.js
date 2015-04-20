/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitNameController', SubmitNameController);

  SubmitNameController.$inject = ['$scope', 'SubmitWorkService'];

  function SubmitNameController($scope, SubmitWorkService) {
    var vm   = this;
    vm.title = 'Name';
    vm.work  = SubmitWorkService.work;

    $scope.$watch('nameForm', function(nameForm) {
      if (nameForm) {
        SubmitWorkService.findState('name').form = nameForm;
      }
    });

    vm.submit = function () {
      if ($scope.nameForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };
  }
})();

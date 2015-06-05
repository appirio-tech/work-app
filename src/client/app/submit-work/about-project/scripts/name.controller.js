/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitNameController', SubmitNameController);

  SubmitNameController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];

  function SubmitNameController($scope, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Name';
    vm.work  = SubmitWorkService.work;
    vm.submit;

    $scope.$watch('nameForm', function(nameForm) {
      if (nameForm) {
        NavService.findState('name').form = nameForm;
      }
    });

    vm.submit = function () {
      if ($scope.nameForm.$valid) {
        NavService.findState('name').visited = true;
        NavService.setNextState();
      }
    };

  }
})();

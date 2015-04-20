/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitUsersController', SubmitUsersController);

  SubmitUsersController.$inject = ['$scope', 'logger', 'SubmitWorkService'];

  function SubmitUsersController($scope, logger, SubmitWorkService) {
    var vm       = this;
    vm.title     = 'Users';
    vm.work      = SubmitWorkService.work;
    vm.submit;

    vm.submit = function () {
      if ($scope.usersForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };

    $scope.$watch('usersForm', function(usersForm) {
      if (usersForm) {
        SubmitWorkService.findState('users').form = usersForm;
      }
    });
  }
})();

/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitUsersController', SubmitUsersController);

  SubmitUsersController.$inject = ['$scope', 'logger', 'SubmitWorkService', 'NavService'];

  function SubmitUsersController($scope, logger, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Users';
    vm.work  = SubmitWorkService.work;
    vm.submit;

    vm.submit = function () {
      if ($scope.usersForm.$valid) {
        NavService.setNextState();
      }
    };

    $scope.$watch('usersForm', function(usersForm) {
      if (usersForm) {
        NavService.findState('users').form = usersForm;
      }
    });
  }
})();

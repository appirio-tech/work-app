/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitCompetitorsController', SubmitCompetitorsController);

  SubmitCompetitorsController.$inject = ['$scope', 'logger', 'SubmitWorkService', 'NavService'];

  function SubmitCompetitorsController($scope, logger, SubmitWorkService, NavService) {
    var vm     = this;
    vm.title   = 'Competitors';
    vm.appName = '';
    vm.work    = SubmitWorkService.work;
    vm.add;
    vm.submit;

    vm.add = function() {
      if (!(vm.appName.trim().length === 0)) {
        vm.work.competitorApps.push(vm.appName);
        vm.appName = '';
        vm.placeholder = ' ';
      }
    }

    vm.submit = function () {
      if ($scope.competitorForm.$valid) {
        NavService.setNextState();
      }
    };

    $scope.$watch('competitorForm', function(competitorForm) {
      if (competitorForm) {
        NavService.findState('competitors').form = competitorForm;
      }
    });
  }
})();

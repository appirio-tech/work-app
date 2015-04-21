/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitBriefController', SubmitBriefController);

  SubmitBriefController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitBriefController($scope, logger, $state, SubmitWorkService) {
    var vm           = this;
    vm.title         = 'Brief';
    vm.work          = SubmitWorkService.work;
    vm.briefFilename = null;
    vm.question      = null;
    vm.showYesNo     = true;
    vm.showBrief     = false;
    vm.showElevator  = false;
    vm.toggleYes;
    vm.toggleNo;
    vm.toggleCancel;
    vm.submitElevator;
    vm.submitBrief;
    vm.questionSubmit;

    vm.toggleYes = function() {
      vm.showYesNo    = false;
      vm.showBrief    = true;
      vm.showElevator = false;
      SubmitWorkService.findState('brief').form = $scope.briefForm;
    }

    vm.toggleNo = function() {
      vm.showYesNo    = false;
      vm.showBrief    = false;
      vm.showElevator = true;
      SubmitWorkService.findState('brief').form = $scope.elevatorForm;
    }

    vm.toggleCancel = function() {
      vm.question     = null;
      vm.showYesNo    = true;
      vm.showBrief    = false;
      vm.showElevator = false;
      SubmitWorkService.findState('brief').form = $scope.questionForm;
    }

    vm.submitElevator = function () {
      if ($scope.elevatorForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };

    vm.submitBrief = function () {
      if ($scope.briefForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };

    vm.questionSubmit = function () {
      if(vm.question === 1) {
        vm.toggleYes();
      }
      else if(vm.question === 0) {
        vm.toggleNo();
      }
    }

    $scope.$watch('questionForm', function(questionForm) {
      if (questionForm) {
        SubmitWorkService.findState('brief').form = $scope.questionForm;
      }
    });
  }
})();

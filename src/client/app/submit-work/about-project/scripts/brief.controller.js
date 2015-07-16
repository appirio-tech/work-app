/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitBriefController', SubmitBriefController);

  SubmitBriefController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService', 'NavService'];
  /* @ngInject */
  function SubmitBriefController($scope, logger, $state, SubmitWorkService, NavService) {
    var vm           = this;
    vm.title         = 'Brief';
    vm.work          = SubmitWorkService.work;
    vm.briefFilename = null;
    vm.question      = null;
    vm.showYesNo     = true;
    vm.showBrief     = false;
    vm.showElevator  = false;
    vm.uploaderStatus = 'pristine';
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
      NavService.findState('brief').form = $scope.briefForm;
    };

    vm.toggleNo = function() {
      vm.showYesNo    = false;
      vm.showBrief    = false;
      vm.showElevator = true;
      NavService.findState('brief').form = $scope.elevatorForm;
    };

    vm.toggleCancel = function() {
      vm.question     = null;
      vm.showYesNo    = true;
      vm.showBrief    = false;
      vm.showElevator = false;
      NavService.findState('brief').form = $scope.questionForm;
    };

    vm.submitElevator = function () {
      if ($scope.elevatorForm.$valid) {
        NavService.setNextState('brief');
      }
    };

    vm.submitBrief = function () {
      if ($scope.briefForm.$valid &&vm.uploaderStatus !== 'started') {
        NavService.setNextState('brief');
      }
    };

    vm.questionSubmit = function () {
      if (vm.question === 1) {
        vm.toggleYes();
      }
      else if (vm.question === 0) {
        vm.toggleNo();
      }
    };

    $scope.$watch('vm.uploaderStatus', function(status) {
      if (status) {
       NavService.findState('brief').uploaderStatus = status;
      }
    });

       $scope.$watch('questionForm', function(questionForm) {
      if (questionForm) {
        NavService.findState('brief').form = $scope.questionForm;
      }
    });

    function activate() {
      if (vm.work.summary && vm.work.summary.length > 1) {
       vm.toggleNo();
      }
    }

    activate();

  }
})();

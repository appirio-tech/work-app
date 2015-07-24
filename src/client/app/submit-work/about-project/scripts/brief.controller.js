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
    vm.toggleYes;
    vm.toggleNo;
    vm.toggleCancel;
    vm.submitElevator;
    vm.submitBrief;
    vm.questionSubmit;

    //file upload configs
    var domain = 'http://api.topcoder-dev.com';
    var workId = vm.work.id
    var assetType = 'brief';

     vm.uploaderSingleStatus = 'pristine';
     vm.uploaderSingleConfig = {
       name: 'singleBriefUploader',
       allowMultiple: false,
       queryUrl: domain + '/v3/work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
       urlPresigner: domain + '/v3/work-files/uploadurl',
       fileEndpoint: domain + '/v3/work-files/:fileId',
       saveParams: {
         workId: workId,
         assetType: assetType
       }
     };

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
      if (vm.uploaderSingleStatus != 'started') {
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

    $scope.$watch('vm.uploaderSingleStatus', function(status) {
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

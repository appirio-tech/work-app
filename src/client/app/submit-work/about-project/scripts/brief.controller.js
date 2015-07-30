/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitBriefController', SubmitBriefController);

  SubmitBriefController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService', 'NavService', 'API_URL'];
  /* @ngInject */
  function SubmitBriefController($scope, logger, $state, SubmitWorkService, NavService, API_URL) {
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
    var workId = vm.work.id
    var assetType = 'brief';
    var domain = API_URL;

     vm.briefUploaderUploading = null;
     vm.briefUploaderHasErrors = null;
     vm.briefUploaderConfig = {
       name: 'briefUploader' + workId,
       allowMultiple: false,
       queryUrl: domain + '/work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
       urlPresigner: domain + '/work-files/uploadurl',
       fileEndpoint: domain + '/work-files/:fileId',
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

    $scope.$watch('vm.briefUploaderUploading', function(newValue) {
      console.log('new uploading', newValue)
       NavService.findState('brief').uploading = newValue;
    });

    $scope.$watch('vm.briefUploaderHasErrors', function(newValue) {
      console.log('new errors', newValue)
       NavService.findState('brief').hasErrors = newValue;
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

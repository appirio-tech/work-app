/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitDesignsController', SubmitDesignsController);

  SubmitDesignsController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService', 'NavService', 'API_URL'];
  /* @ngInject */
  function SubmitDesignsController($scope, logger, $state, SubmitWorkService, NavService, API_URL) {
    var vm            = this;
    vm.title          = 'Designs';
    vm.work           = SubmitWorkService.work;
    vm.submit;

    //file upload configs
    var domain = API_URL;
    var workId = vm.work.id
    var assetType = 'specs';

    vm.designsUploaderUploading = null;
    vm.designsUploaderHasErrors = null;

    vm.designsUploaderConfig = {
      name: 'designsUploader' + workId,
      allowMultiple: true,
      queryUrl: domain + '/work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
      urlPresigner: domain + '/work-files/uploadurl',
      fileEndpoint: domain + '/work-files/:fileId',
      saveParams: {
        workId: workId,
        assetType: assetType
      }
    };

    vm.submit = function () {
      if ($scope.designForm.$valid) {
        NavService.setNextState('designs');
      }
    };

    $scope.$watch('vm.designsUploaderUploading', function(newValue) {
      console.log('designs uploading', newValue)
       NavService.findState('designs').uploading= newValue;
    });

    $scope.$watch('vm.designsUploaderHasErrors', function(newValue) {
      console.log('designs has errors', newValue)
       NavService.findState('designs').hasErrors= newValue;
    });

    $scope.$watch('designForm', function(designForm) {
      if (designForm) {
        NavService.findState('designs').form = designForm;
      }
    });

  }
})();

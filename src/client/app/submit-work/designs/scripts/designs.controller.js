/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitDesignsController', SubmitDesignsController);

  SubmitDesignsController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService', 'NavService', 'apiUrl'];
  /* @ngInject */
  function SubmitDesignsController($scope, logger, $state, SubmitWorkService, NavService, apiUrl) {
    var vm            = this;
    vm.title          = 'Designs';
    vm.work           = SubmitWorkService.work;
    vm.submit;

    //file upload configs
    var domain = apiUrl;
    var workId = vm.work.id
    var assetType = 'specs';

    vm.designsUploaderStatus = 'pristine';
    vm.designsUploaderConfig = {
      name: 'designsUploader',
      allowMultiple: true,
      queryUrl: domain + 'work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
      urlPresigner: domain + 'work-files/uploadurl',
      fileEndpoint: domain + 'work-files/:fileId',
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

    $scope.$watch('vm.designsUploaderStatus', function(status) {
      if (status) {
       NavService.findState('designs').uploaderStatus = status;
      }
    });

    $scope.$watch('designForm', function(designForm) {
      if (designForm) {
        NavService.findState('designs').form = designForm;
      }
    });

  }
})();

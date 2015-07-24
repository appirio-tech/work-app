/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitDesignsController', SubmitDesignsController);

  SubmitDesignsController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService', 'NavService'];
  /* @ngInject */
  function SubmitDesignsController($scope, logger, $state, SubmitWorkService, NavService) {
    var vm            = this;
    vm.title          = 'Designs';
    vm.work           = SubmitWorkService.work;
    vm.submit;

    //file upload configs
    var domain = 'http://api.topcoder-dev.com';
    var workId = vm.work.id
    var assetType = 'specs';

    vm.uploaderMultipleStatus = 'pristine';
    vm.uploaderMultipleConfig = {
      name: 'multipleUploader',
      allowMultiple: true,
      queryUrl: domain + '/v3/work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
      urlPresigner: domain + '/v3/work-files/uploadurl',
      fileEndpoint: domain + '/v3/work-files/:fileId',
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

    $scope.$watch('vm.uploaderMultipleStatus', function(status) {
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

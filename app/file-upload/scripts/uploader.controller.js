(function () {
  'use strict';

  angular
    .module('ap-file-upload')
    .controller('UploaderController', UploaderController);

  UploaderController.$inject = ['$scope', 'UploaderService'];

  function UploaderController($scope, UploaderService) {
    var vm = this;

    function configUploader(newConfig, oldConfig) {
      if (newConfig === undefined) {
        return false;
      }

      var oldName = oldConfig ? oldConfig.name : undefined;
      if (newConfig.name !== oldName) {
        vm.uploader = UploaderService.get(newConfig.name);
      }

      vm.config = newConfig;
      vm.uploader.config(vm.config);

      var oldQuery = oldConfig ? oldConfig.query : undefined;
      if (newConfig.query && newConfig.query !== oldQuery) {
        vm.uploader.populate();
      }

      if (newConfig && !oldConfig) {
        $scope.$watch('vm.uploader.uploading', function(newValue) {
          $scope.uploading = newValue;
        });

        $scope.$watch('vm.uploader.hasErrors', function(newValue) {
          $scope.hasErrors = newValue;
        });

        $scope.$watch('vm.uploader.hasFiles', function(newValue) {
          $scope.hasFiles = newValue;
        });

        $scope.$watch('vm.uploader.fileArray', function(newValue) {
          $scope.fileArray = newValue;
        });
      }
    }

    $scope.$watch('config', configUploader, true);

    configUploader($scope.config);
  }

})();

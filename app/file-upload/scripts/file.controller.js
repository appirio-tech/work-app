(function () {
  'use strict';

  angular
    .module('ap-file-upload')
    .controller('FileController', FileController);

  FileController.$inject = ['$scope'];

  function FileController($scope) {
    var vm           = this;
    vm.file          = $scope.file;
    vm.disabled      = $scope.disabled;
    vm.allowCaptions = vm.file.allowCaptions;
    vm.caption       = '';
    vm.progress      = 0;

    var setSrc = function() {
      var src = vm.file.data.src || vm.file.data.url

      if (src && vm.file.isImage) {
        vm.hasImage = true;
      }
      vm.src = src || require('../images/icon-document.svg');
    }

    $scope.$watch('vm.file.data.src', setSrc);

    setSrc();

    vm.setCaption = function () {
      if (vm.caption.length) {
        vm.file.setCaption(vm.caption);
      }
    }

    vm.file.onProgress = function(progress) {
      $scope.$apply(function() {
        vm.progress = progress;
      })
    }
  }

})();

(function () {
  'use strict';

  angular.module('ap-file-upload').directive('apUploader', apUploader);

  apUploader.$inject = [];

  function apUploader() {
    return {
      scope: {
        uploading: '=',
        hasErrors: '=',
        hasFiles: '=',
        fileArray: '=',
        config: '='
      },
      controller: 'UploaderController as vm',
      templateUrl: 'views/uploader.directive.html'
    }
  };

})();
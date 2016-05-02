(function () {
  'use strict';

  angular.module('ap-file-upload').directive('apFile', apFile);

  apFile.$inject = [];

  function apFile() {
    return {
      scope: {
        file: '=',
        disabled: '='
      },
      controller: 'FileController as vm',
      templateUrl: 'views/file.directive.html'
    }
  };

})();
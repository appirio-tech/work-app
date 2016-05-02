(function () {
  'use strict';

  // Gets around Angular's inability to bind to file input's change event
  // See https://github.com/angular/angular.js/issues/1375
  angular.module('ap-file-upload').directive('onFileChanged', onFileChangedDirective);

  onFileChangedDirective.$inject = [];

  function onFileChangedDirective() {
    return {
      restrict: 'A',
      scope: {
        onFileChanged: '&'
      },
      link: function(scope, element, attr, ctrl) {
        element.bind("change", function() {
          scope.onFileChanged({fileList : element[0].files});
          this.value = '';
        });
      }
    }
  };

})();
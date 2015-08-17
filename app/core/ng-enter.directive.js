(function() {
  'use strict';

  angular.module('app.core').directive('ngEnter', function() {
    return {
      restrict: 'A',
      scope: {
        runOnEnter : "&ngEnter"
      },
      link: function(scope, element, attrs) {
        element.bind('keydown keypress', function(e) {
          if (e.which === 13) {
            e.preventDefault();
            scope.runOnEnter();
            scope.$apply();
          }
        });
      }
    };
  });
})();

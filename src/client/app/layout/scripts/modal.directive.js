(function () {
  'use strict';

  var directive = function () {
    var link = function (scope, element, attrs) {
      var overlay = angular.element('#modal-overlay');

      if (!overlay.length) {
        overlay = angular.element('<div id="modal-overlay"></div>');
        overlay.appendTo('body');
      }

      overlay.bind('click', function () {
        scope.show = false;
        scope.$apply();
      });

      var toggleShow = function (show) {
        if (show) {
          element.show();
          overlay.show();
        }
        else {
          element.hide();
          overlay.hide();
        }
      };

      scope.$watch('show', toggleShow);
    };


    return {
      restrict: 'A',
      link    : link,
      scope: {
        show : "=ngModal"
      }
    };
  };

  directive.$inject = [];

  angular.module('app.layout').directive('ngModal', directive);
})();

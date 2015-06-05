(function () {
  'use strict';

  var directive = function () {
    var link = function (scope, element, attrs) {
      var overlay     = angular.element('#modal-overlay');
      var closeButton = angular.element('<button type="button" class="clean close"></button>');

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

      var close = function () {
        scope.show = false;
        scope.$apply();
      }

      closeButton.prependTo(element).bind('click', close);

      if (!overlay.length) {
        overlay = angular.element('<div id="modal-overlay"></div>');
        overlay.appendTo('body');
      }

      overlay.bind('click', close);

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

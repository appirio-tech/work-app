(function () {
  'use strict';

  var directive = function ($document, $rootScope) {
    var link = function (scope, element, attrs) {
      var stateElements      = element.find('.state');
      var previousScrollTop  = $document.scrollTop();
      var isAutoScrolling    = false;
      var isManualScrolling  = false;

      function setActiveStateElement () {
        var activeStateElement = stateElements.eq(0);

        stateElements.each(function (i, state) {
          var startingLine = element.find('#starting-line-' + stateElements.eq(i).attr('state'));
          var hitThreshold = startingLine.offset().top < $document.scrollTop() + 1;

          if (hitThreshold) {
            activeStateElement = stateElements.eq(i);
          }
        });

        stateElements.removeClass('state-active');

        activeStateElement.addClass('state-active');

        return activeStateElement;
      }

      var manualScrolling = function (e) {
        var activeState = setActiveStateElement().attr('state');

        if (scope.activeState != activeState) {
          isManualScrolling = true;
          scope.activeState = activeState;
          scope.$apply();
        }
      };

      var autoScrolling = function (state) {
        if (isManualScrolling) {
          isManualScrolling = false;
        }
        else if (state) {
          var stateElement = element.find('#starting-line-' + state);
          $document.scrollToElementAnimated(stateElement);
        }
      };

      scope.$watch('activeState', autoScrolling);

      $document.bind('scroll', manualScrolling);
    };

    return {
      restrict   : 'A',
      scope: {
        activeState : "=ngScrollState"
      },
      link       : link
    };
  };

  directive.$inject = ['$document', '$rootScope'];

  angular.module('app.submit-work').directive('ngScrollState', directive);
})();

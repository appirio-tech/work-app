(function () {
  'use strict';

  var directive = function ($document, $rootScope) {
    var link = function (scope, element, attrs) {
      var stateElements      = element.find('.state');
      var previousScrollTop  = $document.scrollTop();
      var activeStateElement = stateElements.eq(0);
      var nextStateElement   = stateElements.eq(1);
      var isAutoScrolling    = false;
      var prevStateElement;
      var initialAutoScroll = false;

      function setActiveStateElement () {
        stateElements.each(function (i, state) {
          var startingLine = element.find('#starting-line-' + stateElements.eq(i).attr('state'));

          if (startingLine.offset().top <= $document.scrollTop()) {
            activeStateElement = stateElements.eq(i);

            if (i == 0) {
              prevStateElement = false;
            }
            else {
              prevStateElement = stateElements.eq(i - 1);
            }

            if (i == stateElements.length - 1) {
              false;
            }
            else {
              nextStateElement = stateElements.eq(i + 1);
            }
          }
        });
      }

      var manualScrolling = function (e) {
        console.log(e);
        setActiveStateElement();

        if (isAutoScrolling) {
          console.log('auto scrolling...');
          return true;
        }

        console.log('manual scrolling...');

        var nextState, hitThreshold;
        var scrollingDown = previousScrollTop < $document.scrollTop();

        previousScrollTop = $document.scrollTop();

        nextState = activeStateElement.attr('state');

        if (scrollingDown && nextStateElement) {
          hitThreshold = activeStateElement.offset().top < $document.scrollTop();

          if (hitThreshold) {
            nextState = nextStateElement.attr('state');
          }
        }

        if (!scrollingDown && prevStateElement) {
          var previousFinishLine = element.find('#finish-line-' + prevStateElement.attr('state'));

          hitThreshold = previousFinishLine.offset().top > $document.scrollTop();

          if (hitThreshold) {
            nextState = prevStateElement.attr('state');
          }
        }

        if (!e) {
          initialAutoScroll = true;
        }

        if (scope.activeState != nextState) {
          scope.activeState = nextState;
          scope.$apply();
        }
      };

      var autoScrolling = function (state) {
        if (state) {
          var stateElement = element.find('#starting-line-' + state);

          var finishedScrolling = function () {
            isAutoScrolling = false;

            console.log('turn off auto scrolling.');

            stateElements.removeClass('state-active');

            element.find('[state="' + state + '"]').addClass('state-active');

            setActiveStateElement();
          };

          isAutoScrolling = true;

          if (initialAutoScroll) {
            finishedScrolling();
            initialAutoScroll = false;
          }
          else {
            console.log('auto scrolling to `' + state + '`');
            $document.scrollToElementAnimated(stateElement).then(finishedScrolling);
          }
        }
      };

      scope.$watch('activeState', autoScrolling);

      $document.bind('scroll', manualScrolling);

      manualScrolling();
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

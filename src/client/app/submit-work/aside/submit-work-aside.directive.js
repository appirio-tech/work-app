(function () {
  'use strict';

  var directive = function ($rootScope, $document) {
    var link = function (scope, element, attrs) {
      scope.scrollTo = function(state) {
        var stateElement = angular.element('[ng-scroll-state="submit-work"] [state="' + state + '"]');
        $document.scrollToElementAnimated(stateElement, 150);
      };

      var setFixed = function () {
        if ($document.scrollTop() >= 100) {
          element.addClass('fixed');
        }
        else {
          element.removeClass('fixed');
        }
      };

      angular.element($document).bind('scroll', setFixed);

      setFixed();

      // needs refactoring when more time
      $rootScope.$on('scroll-state', function (rootScope, state) {
        element.find('.state-active').removeClass('state-active');

        element.find('[state="' + state + '"]').addClass('state-active');
      });

      element.find('[state="' + $rootScope.scrollState + '"]').addClass('state-active');
    };

    return {
      restrict   : 'A',
      templateUrl: 'submit-work/aside/submit-work-aside.html',
      link       : link
    };
  };

  directive.$inject = ['$rootScope', '$document'];

  angular.module('app.submit-work').directive('ngSubmitWorkAside', directive);
})();

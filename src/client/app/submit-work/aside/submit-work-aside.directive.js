(function () {
  'use strict';

  var directive = function ($window, $rootScope) {
    var link = function (scope, element, attrs) {
      var setFixed = function () {
        if ($window.scrollY >= 100) {
          element.addClass('fixed');
        }
        else {
          element.removeClass('fixed');
        }
      };

      angular.element($window).bind('scroll', setFixed);

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

  directive.$inject = ['$window', '$rootScope'];

  angular.module('app.submit-work').directive('ngSubmitWorkAside', directive);
})();

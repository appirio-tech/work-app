(function () {
  'use strict';

  var directive = function ($window, $rootScope) {
    var link = function (scope, element, attrs) {
      var states = element.find('.state');

      var setState = function () {
        var lastVisible = states.first();

        states.each(function (i, state) {
          // need to remove static `+ 200`

          if (states.eq(i).offset().top < ($window.scrollY + 200)) {
            lastVisible = states.eq(i);
          }
        });

        states.removeClass('state-active');

        lastVisible.addClass('state-active');

        // needs refactoring when more time
        $rootScope.$emit('scroll-state', lastVisible.attr('state'));
        $rootScope.scrollState = lastVisible.attr('state');
      };

      angular.element($window).bind('scroll', setState);

      setState();
    };

    return {
      restrict   : 'A',
      link       : link
    };
  };

  directive.$inject = ['$window', '$rootScope'];

  angular.module('app.submit-work').directive('ngScrollState', directive);
})();

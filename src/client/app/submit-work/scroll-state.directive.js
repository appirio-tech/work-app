(function () {
  'use strict';

  var directive = function ($document, $rootScope) {
    var link = function (scope, element, attrs) {
      var states = element.find('.state');

      var setState = function () {
        var lastVisible = states.first();

        states.each(function (i, state) {
          // need to remove static `+ 220`
          // Cant do more than 220 untill we can load modules in order to do layout first
          if (states.eq(i).offset().top < ($document.scrollTop() + 220)) {
            lastVisible = states.eq(i);
          }
        });

        states.removeClass('state-active');

        lastVisible.addClass('state-active');

        // needs refactoring when more time
        $rootScope.$emit('scroll-state', lastVisible.attr('state'));
        $rootScope.scrollState = lastVisible.attr('state');
      };

      $document.bind('scroll', setState);

      setState();
    };

    return {
      restrict   : 'A',
      link       : link
    };
  };

  directive.$inject = ['$document', '$rootScope'];

  angular.module('app.submit-work').directive('ngScrollState', directive);
})();

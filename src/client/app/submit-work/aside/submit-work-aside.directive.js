(function () {
  'use strict';

  var directive = function ($window) {
    var link = function (scope, element, attrs) {
      var setFixed = function () {
        element.removeClass('fixed');

        if (this.pageYOffset >= 100) {
          element.addClass('fixed');
        }
      };

      angular.element($window).bind('scroll', setFixed);
    };

    return {
      restrict   : 'A',
      templateUrl: 'submit-work/aside/submit-work-aside.html',
      link       : link
    };
  };

  angular.module('app.submit-work').directive('ngSubmitWorkAside', ['$window', directive]);
})();

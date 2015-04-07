(function () {
  'use strict';

  var directive = function ($rootScope, $document, SubmitWorkService) {
    var link = function (scope, element, attrs) {
      scope.scrollTo = function(state) {
        var stateElement = angular.element('#starting-line-' + state);

        $document.scrollToElementAnimated(stateElement);
      };
      scope.getPrice = function() {
        return SubmitWorkService.getPrice();
      }

      var setFixed = function () {
        // Need to refactor to avoid constant
        if ($document.scrollTop() >= 100) {
          element.addClass('fixed');
        }
        else {
          element.removeClass('fixed');
        }
      };

      $document.bind('scroll', setFixed);

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

  directive.$inject = ['$rootScope', '$document', 'SubmitWorkService'];

  angular.module('app.submit-work').directive('ngSubmitWorkAside', directive);
})();

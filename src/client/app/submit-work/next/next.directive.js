(function () {
  'use strict';

  var directive = function ($rootScope, $document, SubmitWorkService) {
    var link = function (scope, element, attrs) {
      scope.scrollTo = function() {
        SubmitWorkService.save();
        var stateElement = angular.element('[ng-scroll-state="submit-work"] [state="' + scope.state + '"]');
        $document.scrollToElementAnimated(stateElement, 150);
      };
    };

    return {
      restrict   : 'E',
      templateUrl: 'submit-work/next/next-state.html',
      link       : link,
      scope: {
        state: '=state'
      }
    };
  };

  directive.$inject = ['$rootScope', '$document', 'SubmitWorkService'];

  angular.module('app.submit-work').directive('nextState', directive);
})();

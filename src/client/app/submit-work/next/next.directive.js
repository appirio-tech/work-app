(function () {
  'use strict';

  var directive = function ($rootScope, $document, SubmitWorkService) {
    var link = function (scope, element, attrs) {
      scope.scrollTo = function() {
        if (scope.vm.validate && !scope.vm.validate().valid) return;
        SubmitWorkService.save();
        var stateElement = angular.element('#starting-line-' + state);
        $document.scrollToElementAnimated(stateElement);
      };
    };

    return {
      restrict   : 'E',
      templateUrl: 'submit-work/next/next-state.html',
      link       : link,
      scope: {
        state: '=state',
        vm: '='
      }
    };
  };

  directive.$inject = ['$rootScope', '$document', 'SubmitWorkService'];

  angular.module('app.submit-work').directive('nextState', directive);
})();

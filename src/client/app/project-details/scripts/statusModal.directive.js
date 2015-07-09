(function () {
  'use strict';

  var directive = function ($state) {
    var link = function (scope, element, attrs) {
      scope.hideModal = function() {
        element.hide();
      }
      if (attrs.nextStep) {
        scope.nextStep = attrs.nextStep;
      }
      scope.nextState = function() {
        scope.hideModal();
        if (attrs.nextState) {
          $state.go(attrs.nextState);
        }
      }
    };

    return {
      restrict: 'E',
      link    : link,
      transclude: true,
      scope: {
      },
      templateUrl: function(elem, attr){
      return 'project-details/'+attr.type+'.html';
    }
    };
  };

  directive.$inject = ['$state'];

  angular.module('app.project-details').directive('statusModal', directive);
})();

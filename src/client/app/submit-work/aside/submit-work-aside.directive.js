(function () {
  'use strict';

  var directive = function ($rootScope, $document, SubmitWorkService) {
    var link = function (scope, element, attrs) {


      scope.work = SubmitWorkService.work;

      scope.getEstimate = SubmitWorkService.getEstimate;
      scope.$watch('activeState', function (state) {
        element.find('.state-active').removeClass('state-active');
        element.find('[state="' + state + '"]').addClass('state-active');
      }, true);

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

      $rootScope.$on('submit-work-show-example', function (rootScope, example) {
        element.find('.example.' +  example).show();
      });

      $rootScope.$on('submit-work-hide-example', function (rootScope, example) {
        element.find('.example').hide();
      });
    };

    return {
      restrict   : 'A',
      scope: {
        activeState: "=ngActiveState",
        work       : "=ngSubmitWorkAside",
        completed  : "=ngCompleted"
      },
      templateUrl: 'submit-work/aside/submit-work-aside.html',
      link       : link
    };
  };

  directive.$inject = ['$rootScope', '$document', 'SubmitWorkService'];

  angular.module('app.submit-work').directive('ngSubmitWorkAside', directive);
})();

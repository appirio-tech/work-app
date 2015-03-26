(function () {
  'use strict';

  var directive = function () {
    return {
      restrict   : 'A',
      templateUrl: 'submit-work/nav/submit-work-nav.html',
      link       : function () {
        // Fun Logic!
      }
    }
  };

  angular.module('app.submit-work').directive('ngSubmitWorkNav', directive);
})();
(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .filter('lookandFeelFilter', lookandFeelFilter);

  /* @ngInject */
  function lookandFeelFilter() {
    return function(value, left, right) {
      switch (value) {
        case 1:
          return left;
        case 2:
          return 'More ' + left + ' than ' + right;
        case 3:
          return 'Mix of ' + left + ' and ' + right;
        case 4:
          return 'Less ' + left + ', more ' + right;
        case 5:
          return right;
      }
    };
  }
})();

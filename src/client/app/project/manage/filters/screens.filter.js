(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .filter('screens', screens);

  /* @ngInject */
  function screens() {
    return function(value) {
      switch (value) {
        case 1:
          return '1 screen (from $500)';
        case 2:
          return '2 screens (from $600)';
        case 3:
          return '3 screens (from $700)';
        case 4:
          return '4 screens (from $800)';
        case 5:
          return '5 screens (from $900)';
        case 6:
          return 'Other';
      }
    };
  }
})();

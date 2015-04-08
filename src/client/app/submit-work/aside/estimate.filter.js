(function() {
  'use strict';

  angular
    .module('app.submit-work')
    .filter('estimate', EstimateFilter);

  EstimateFilter.$inject = [];

  function EstimateFilter() {
    return function(input) {
      if (!input) {
        return '';
      }

      return "$" + input;
    };
  }
})();

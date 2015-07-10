(function() {
  'use strict';

  angular
    .module('app.project-details')
    .filter('statusButton', StatusButtonFilter);

  StatusButtonFilter.$inject = [];

  function StatusButtonFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'Assigned': 'Estimates Required',
       'Estimate'  : 'View Details',
       'Approved': 'Create Challenges',
       'Launched': 'View Details'
     };

     return typeDisplays[input] || 'View Details'
    };
  }
})();
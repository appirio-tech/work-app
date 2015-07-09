(function() {
  'use strict';

  angular
    .module('app.project-details')
    .filter('requestType', RequestTypeFilter);

  RequestTypeFilter.$inject = [];

  function RequestTypeFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'design': 'Design',
       'code'  : 'Development',
       'both': 'Design & Development'
     };

     return typeDisplays[input]
    };
  }
})();
(function () {
  'use strict';

  angular.module('app.layout', ['app.core']).run(function($rootScope, $location) {
   $rootScope.$on('$locationChangeStart', function(e, data) {
      if ($location.$$url == '/') {
        $rootScope.pageClass = 'getting-started';
      }
      else {
        $rootScope.pageClass = $location.$$url.replace('/', ' ');
      }
    });
  });
})();

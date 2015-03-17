(function () {
  'use strict';

  angular.module('app.project.core', [
    'app.core',
    'ngMessages',
    'app.constants'
  ])
  .run(['$injector', 'useStubs', function($injector, useStubs) {
    if (useStubs == 'true') {
      return $injector.get('projectMock');
    }
  }]);

})();

/* jshint -W106 */
(function () {
  'use strict';

  angular
    .module('app.login', [
      'angular-storage',
      'angular-jwt',
      'app.user',
      'app.auth'
    ]);
})();

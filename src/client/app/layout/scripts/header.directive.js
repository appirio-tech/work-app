(function () {
  'use strict';

  angular.module('app.layout')
    .directive('ngHeader', headerDirective);

    headerDirective.$inject = [];

    function headerDirective() {
      var directive = {
        restrict    : 'A',
        controller: HeaderDirectiveController
      };

      return directive;
    }

  HeaderDirectiveController.$inject = ['AuthService', '$scope'];
  /* @ngInject */
  function HeaderDirectiveController(AuthService, $scope) {
   $scope.getPath = function () {
      return AuthService.isAuthenticated() ? '/#/manage' : '#/'
    }
  }
})();

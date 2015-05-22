(function () {
  'use strict';

  angular.module('app.layout')
  .directive('ngHeader', headerDirective);

  headerDirective.$inject = [];

  function headerDirective() {
    var directive = {
      restrict: 'A', controller: HeaderDirectiveController
    };

    return directive;
  }

  HeaderDirectiveController.$inject = ['AuthService', '$scope'];

  function HeaderDirectiveController(AuthService, $scope) {
   $scope.getPath = AuthService.isAuthenticated() ? '/#/manage' : '#/'
  }
})();

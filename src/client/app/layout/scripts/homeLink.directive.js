(function () {
'use strict';

angular.module('app.layout')
.directive('ngHomeLink', homeLinkDirective);

homeLinkDirective.$inject = [];

function homeLinkDirective() {
  var directive = {
    restrict: 'A',
    controller: HomeLinkDirectiveController
  };

  return directive;
}

HomeLinkDirectiveController.$inject = ['AuthService', '$scope'];

function HomeLinkDirectiveController(AuthService, $scope) {
   $scope.getPath = function() {
    return AuthService.isAuthenticated() ? '/#/manage' : '#/'
  }
}
})();

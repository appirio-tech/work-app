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
  // TODO: this shouldnt be a functions since it gets called multiple times
  // should consider using a scope.$watch on the UserV3Service
   $scope.getPath = function() {
    return AuthService.isAuthenticated() ? '#/manage' : '#/'
  }
}
})();

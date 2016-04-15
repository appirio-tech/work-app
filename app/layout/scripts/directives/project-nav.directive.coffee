'use strict'

dir = ->
  restrict: 'E'
  templateUrl: 'views/layout-project-nav.directive.html'
  controller: 'ProjectNavController as vm'
  scope:
    workId  : '@workId'
    userType: '@userType'

dir.$inject = []

angular.module('appirio-tech-ng-work-layout').directive 'layoutProjectNav', dir

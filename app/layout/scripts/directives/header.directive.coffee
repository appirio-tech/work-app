'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/layout-header.directive.html'
  controller : 'LayoutHeaderController as vm'
  scope      : {}
  bindToController:
    workId   : '@'
    userType : '@'
    store    : '='

angular.module('appirio-tech-ng-work-layout').directive 'layoutHeader', directive

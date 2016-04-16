'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/layout-header.directive.jade')()
  controller : 'LayoutHeaderController as vm'
  scope      : {}
  bindToController:
    workId   : '@'
    userType : '@'
    store    : '='

angular.module('appirio-tech-ng-work-layout').directive 'layoutHeader', directive

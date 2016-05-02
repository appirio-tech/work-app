'use strict'

dir = ->
  restrict: 'E'
  template   : require('../../views/layout-project-nav.directive.jade')()
  controller: 'ProjectNavController as vm'
  scope:
    workId  : '@workId'
    userType: '@userType'

dir.$inject = []

angular.module('work-layout').directive 'layoutProjectNav', dir

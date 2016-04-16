'use strict'

dir = ->
  restrict   : 'E'
  template   : require('../../views/project-drop-down.directive.jade')()
  controller : 'ProjectDropDownController as vm'
  scope:
    userType: '@userType'

dir.$inject = []

angular.module('appirio-tech-ng-work-layout').directive 'projectDropDown', dir

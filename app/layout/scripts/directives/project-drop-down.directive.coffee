'use strict'

dir = ->
  restrict   : 'E'
  templateUrl: 'views/project-drop-down.directive.html'
  controller : 'ProjectDropDownController as vm'
  scope:
    userType: '@userType'

dir.$inject = []

angular.module('appirio-tech-ng-work-layout').directive 'projectDropDown', dir

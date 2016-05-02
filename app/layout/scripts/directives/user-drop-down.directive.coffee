'use strict'

dir = ->
  restrict   : 'E'
  template   : require('../../views/user-drop-down.directive.jade')()
  controller : 'UserDropDownController as vm'
  scope      : true

dir.$inject = []

angular.module('work-layout').directive 'userDropDown', dir

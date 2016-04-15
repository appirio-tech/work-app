'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/message-drop-down.directive.jade')()
  controller  : 'MessageDropDownController as vm'
  scope       :
    subscriberId: '@subscriberId'
    userType    : '@userType'

directive.$inject = []

angular.module('appirio-tech-ng-work-layout').directive 'messageDropDown', directive

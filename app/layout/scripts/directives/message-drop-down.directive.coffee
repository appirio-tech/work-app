'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/message-drop-down.directive.html'
  controller  : 'MessageDropDownController as vm'
  scope       :
    subscriberId: '@subscriberId'
    userType    : '@userType'

directive.$inject = []

angular.module('appirio-tech-ng-work-layout').directive 'messageDropDown', directive

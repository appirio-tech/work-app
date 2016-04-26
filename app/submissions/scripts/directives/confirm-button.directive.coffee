'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/confirm-button.directive.jade')()
  controller : 'ConfirmButtonController as vm'
  scope      :
    projectId:   '@'
    stepId:      '@'
    userType:    '@'
    permissions: '='

angular.module('appirio-tech-submissions').directive 'confirmButton', directive

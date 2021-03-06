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

angular.module('submissions').directive 'confirmButton', directive

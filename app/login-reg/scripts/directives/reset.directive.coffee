'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/reset-password.directive.jade')()
  controller  : 'ResetPasswordController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'resetPassword', directive

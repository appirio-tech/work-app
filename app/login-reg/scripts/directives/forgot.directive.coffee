'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/forgot-password.directive.jade')()
  controller  : 'ForgotPasswordController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'forgotPassword', directive

'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/forgot-password.directive.html'
  controller  : 'ForgotPasswordController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'forgotPassword', directive

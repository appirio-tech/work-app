'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/reset-password.directive.html'
  controller  : 'ResetPasswordController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'resetPassword', directive

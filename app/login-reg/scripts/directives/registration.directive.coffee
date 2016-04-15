'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/registration.directive.jade')()
  controller  : 'RegistrationController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'registration', directive

'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/registration.directive.html'
  controller  : 'RegistrationController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'registration', directive

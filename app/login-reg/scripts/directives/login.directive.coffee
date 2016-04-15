'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/login.directive.html'
  controller  : 'LoginController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'login', directive

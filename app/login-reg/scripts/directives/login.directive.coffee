'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/login.directive.jade')()
  controller  : 'LoginController as vm'
  scope       : true

angular.module('appirio-tech-ng-login-reg').directive 'login', directive

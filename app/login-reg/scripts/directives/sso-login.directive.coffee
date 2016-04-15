'use strict'

directive = ->
  restrict        : 'E'
  template        : require('../../views/sso-login.directive.jade')()
  controller      : 'SSOLoginController as vm'
  scope           : true

angular.module('appirio-tech-ng-login-reg').directive 'ssoLogin', directive

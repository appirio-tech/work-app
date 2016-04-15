'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/sso-callback.directive.jade')()
  controller  : 'SSOCallbackController as vm'
  scope       :
    token     : '@'
    status    : '@'
    message   : '@'
    auto      : '@'

angular.module('appirio-tech-ng-login-reg').directive 'ssoCallback', directive

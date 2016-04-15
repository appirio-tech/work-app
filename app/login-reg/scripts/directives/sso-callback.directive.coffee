'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/sso-callback.directive.html'
  controller  : 'SSOCallbackController as vm'
  scope       :
    token     : '@'
    status    : '@'
    message   : '@'
    auto      : '@'

angular.module('appirio-tech-ng-login-reg').directive 'ssoCallback', directive

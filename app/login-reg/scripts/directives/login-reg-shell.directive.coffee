'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/login-reg-shell.directive.jade')()
  controller  : 'LoginRegShellController as vm'
  scope       :
    flow: '@'

angular.module('appirio-tech-ng-login-reg').directive 'loginRegShell', directive

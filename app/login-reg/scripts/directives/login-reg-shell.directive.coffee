'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/login-reg-shell.directive.html'
  controller  : 'LoginRegShellController as vm'
  scope       :
    flow: '@'

angular.module('appirio-tech-ng-login-reg').directive 'loginRegShell', directive

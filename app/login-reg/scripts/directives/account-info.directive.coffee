'use strict'

Provider = require '../elements/provider'
AccountInfo = require '../elements/account-info/account-info.container'

directive = (reactDirective) ->
  reactDirective Provider(AccountInfo)

directive.$inject = ['reactDirective']

angular.module('appirio-tech-ng-login-reg').directive 'accountInfo', directive

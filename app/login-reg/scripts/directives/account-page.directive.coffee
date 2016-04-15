'use strict'

Provider = require '../elements/provider'
AccountPage = require '../elements/account-page/account-page.element'

directive = (reactDirective) ->
  reactDirective Provider(AccountPage)

directive.$inject = ['reactDirective']

angular.module('appirio-tech-ng-login-reg').directive 'accountPage', directive

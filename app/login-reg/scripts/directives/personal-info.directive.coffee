'use strict'

Provider     = require '../elements/provider'
PersonalInfo = require '../elements/personal-info/personal-info.container'

directive = (reactDirective) ->
  reactDirective Provider(PersonalInfo)

directive.$inject = ['reactDirective']

angular.module('appirio-tech-ng-login-reg').directive 'personalInfo', directive

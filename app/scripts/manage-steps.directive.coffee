'use strict'

Provider = require 'appirio-tech-ng-ui-components/components/Provider/Provider'
ManageSteps = require 'appirio-tech-react-components/components/ManageSteps/ManageSteps'

directive = (reactDirective) ->
  reactDirective Provider(ManageSteps)

directive.$inject = ['reactDirective']

angular.module('appirio-tech-ng-login-reg').directive 'manageSteps', directive

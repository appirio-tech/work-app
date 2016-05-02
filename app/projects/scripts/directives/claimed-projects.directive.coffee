'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/claimed-projects.directive.jade')()
  controller  : 'ClaimedProjectsController as vm'
  scope       :
    copilotId : '@copilotId'

angular.module('projects').directive 'claimedProjects', directive

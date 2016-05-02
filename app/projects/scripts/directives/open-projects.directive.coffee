'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/open-projects.directive.jade')()
  controller  : 'OpenProjectsController as vm'
  scope       : true

angular.module('projects').directive 'openProjects', directive

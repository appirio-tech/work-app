'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/open-projects.directive.jade')()
  controller  : 'OpenProjectsController as vm'
  scope       : true

angular.module('appirio-tech-ng-projects').directive 'openProjects', directive

'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/ng-projects.directive.jade')()
  controller  : 'NgProjectsController as vm'
  scope       : true

angular.module('projects').directive 'ngProjects', directive

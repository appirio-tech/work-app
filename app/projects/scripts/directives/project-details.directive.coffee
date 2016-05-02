'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/project-details.directive.jade')()
  controller  : 'ProjectDetailsController as vm'
  scope       :
    id:          '@projectId'
    copilotId:   '@copilotId'
    permissions: '='

angular.module('appirio-tech-ng-projects').directive 'projectDetails', directive

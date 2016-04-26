'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submissions-header.directive.jade')()
  controller  : 'SubmissionsHeaderController as vm'
  scope       :
    projectId : '@'
    stepId    : '@'

angular.module('appirio-tech-submissions').directive 'submissionsHeader', directive

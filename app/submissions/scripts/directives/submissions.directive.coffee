'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionsController as vm'
  template    : require('../../views/submissions.directive.jade')()
  scope       :
    projectId : '@'
    stepId    : '@'
    stepType  : '@'
    userType  : '@'
    permissions: '='

angular.module('appirio-tech-submissions').directive 'submissions', directive

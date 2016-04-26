'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'SubmissionDetailController as vm'
  template       : require('../../views/submission-detail.directive.jade')()
  scope          :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'
    userType     : '@'
    permissions  : '='

angular.module('appirio-tech-submissions').directive 'submissionDetail', directive

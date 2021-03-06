'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/submission-list.directive.jade')()
  controller : 'SubmissionListController as vm'
  scope      :
    projectId  : '@'
    stepId     : '@'
    userType   : '@'
    permissions: '='

angular.module('submissions').directive 'submissionList', directive

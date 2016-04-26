'use strict'

directive = ->
  restrict   : 'E'
  controller : 'SubmissionWinnersController as vm'
  template   : require('../../views/submission-winners.directive.jade')()
  scope      :
    projectId : '@'
    stepId    : '@'

angular.module('appirio-tech-submissions').directive 'submissionWinners', directive

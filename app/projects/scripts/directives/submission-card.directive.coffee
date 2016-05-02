'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submission-card.directive.jade')()
  controller  : 'SubmissionCardController as vm'
  scope       :
    phase: '@phase'
    end: '@end'
    id: '@id'
    stepId: '@stepId'

angular.module('appirio-tech-ng-projects').directive 'submissionCard', directive

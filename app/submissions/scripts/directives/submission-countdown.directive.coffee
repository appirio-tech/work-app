'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/submission-countdown.directive.jade')()
  scope      :
    end : '@'
    text: '@'

angular.module('appirio-tech-submissions').directive 'submissionCountdown', directive

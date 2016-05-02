'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/submission-winner-card.directive.jade')()
  scope      :
    nameText      : '@'
    avatarUrl     : '@'
    rank          : '@'
    belongsToUser : '@'

angular.module('submissions').directive 'submissionWinnerCard', directive

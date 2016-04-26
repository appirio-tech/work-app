'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/rank-dropdown.directive.jade')()
  controller : 'RankDropdownController as vm'
  scope      :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'
    userType     : '@'
    permissions  : '='

angular.module('appirio-tech-submissions').directive 'rankDropdown', directive

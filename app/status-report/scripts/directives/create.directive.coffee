'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/create-status-report.directive.jade')()
  controller: 'CreateController as vm'
  scope:
    workId:      '@'
    stepId:      '@'
    permissions: '='

angular.module('status-report').directive 'createStatusReport', directive

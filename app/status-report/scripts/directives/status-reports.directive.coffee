'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/status-reports.directive.jade')()
  controller  : 'StatusReportsController as vm'
  scope:
    workId:      '@'
    stepId:      '@'
    permissions: '='

angular.module('status-report').directive 'statusReports', directive

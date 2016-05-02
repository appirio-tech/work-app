'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/status-reports.directive.jade')()
  controller  : 'StatusReportsController as vm'
  scope:
    workId:      '@'
    stepId:      '@'
    permissions: '='

angular.module('appirio-tech-ng-status-report').directive 'statusReports', directive

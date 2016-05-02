'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/past-status-reports.directive.jade')()
  controller  : 'PastReportsController as vm'
  scope:
    workId: '@workId'

angular.module('appirio-tech-ng-status-report').directive 'pastStatusReports', directive

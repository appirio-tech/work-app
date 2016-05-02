'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/past-status-reports.directive.jade')()
  controller  : 'PastReportsController as vm'
  scope:
    workId: '@workId'

angular.module('status-report').directive 'pastStatusReports', directive

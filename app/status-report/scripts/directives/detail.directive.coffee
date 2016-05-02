'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/detail-status-report.directive.jade')()
  controller  : 'DetailController as vm'
  scope:
    workId: '@workId'
    reportId: '@reportId'

angular.module('appirio-tech-ng-status-report').directive 'detailStatusReport', directive

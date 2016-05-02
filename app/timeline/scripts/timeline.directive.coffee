'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'TimelineController as vm'
  template    : require('../views/timeline.directive.jade')()
  scope       :
    workId    : '@workId'
    permissions: '='

angular.module('appirio-tech-ng-timeline').directive 'timeline', directive

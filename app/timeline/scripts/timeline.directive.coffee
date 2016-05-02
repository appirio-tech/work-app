'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'TimelineController as vm'
  template    : require('../views/timeline.directive.jade')()
  scope       :
    workId    : '@workId'
    permissions: '='

angular.module('timeline').directive 'timeline', directive

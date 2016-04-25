'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submit-work-type.directive.jade')()
  controller  : 'SubmitWorkTypeController as vm'
  scope       :
    workId: '@'
    permissions: '='

angular.module('project-creation').directive 'submitWorkType', directive

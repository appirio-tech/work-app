'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submit-work-visuals.directive.jade')()
  controller  : 'SubmitWorkVisualController as vm'
  scope       :
    workId : '@'
    store: '='
    permissions: '='

angular.module('project-creation').directive 'submitWorkVisuals', directive

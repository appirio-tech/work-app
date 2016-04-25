'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submit-work-complete.directive.jade')()
  controller  : 'SubmitWorkCompleteController as vm'
  scope       :
    workId : '@workId'

angular.module('project-creation').directive 'submitWorkComplete', directive

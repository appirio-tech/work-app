'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'FileDetailSlideContainerController as vm'
  template       : require('../../views/file-detail-slide-container.directive.jade')()
  scope          :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'
    fileId       : '@'
    userType     : '@'

angular.module('submissions').directive 'fileDetailSlideContainer', directive
'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submit-work-upload-requirements.directive.jade')()
  controller  : 'SubmitWorkUploadRequirementsController as vm'
  scope       :
    workId : '@workId'

angular.module('project-creation').directive 'submitWorkUploadRequirements', directive
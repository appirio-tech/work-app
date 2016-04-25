'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/submit-work-features.directive.jade')()
  controller : 'SubmitWorkFeaturesController as vm'
  scope       :
    workId: '@'
    store: '='
    permissions: '='

angular.module('project-creation').directive 'submitWorkFeatures', directive

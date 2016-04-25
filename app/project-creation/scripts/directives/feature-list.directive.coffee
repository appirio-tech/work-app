'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/feature-list.directive.jade')()
  controller  : 'FeaturelistController as vm'
  scope       :
    activateFeature  : '&'
    activeFeature: '='
    headerText: '@'
    icon      : '@'
    features  : '='

angular.module('project-creation').directive 'featureList', directive

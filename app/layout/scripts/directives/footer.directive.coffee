'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/layout-footer.directive.jade')()
  scope      : true

angular.module('appirio-tech-ng-work-layout').directive 'layoutFooter', directive

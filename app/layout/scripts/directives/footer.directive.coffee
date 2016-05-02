'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/layout-footer.directive.jade')()
  scope      : true

angular.module('work-layout').directive 'layoutFooter', directive

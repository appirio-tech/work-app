'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/layout-footer.directive.html'
  scope      : true

angular.module('appirio-tech-ng-work-layout').directive 'layoutFooter', directive

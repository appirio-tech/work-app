'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/file-grid.directive.jade')()
  controller : 'FileGridController as vm'
  scope      :
    files: '='

angular.module('appirio-tech-submissions').directive 'fileGrid', directive

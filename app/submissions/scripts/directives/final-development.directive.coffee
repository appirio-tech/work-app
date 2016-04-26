'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/final-development.directive.jade')()
  controller : 'FinalDevelopmentController as vm'
  scope:
    files: '='
    text:  '='
    links: '='


angular.module('appirio-tech-submissions').directive 'finalDevelopment', directive

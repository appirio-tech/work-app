'use strict'

directive = ->
  restrict : 'A'

directive.$inject = []

angular.module('work-layout').directive 'layoutMain', directive


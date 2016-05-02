'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/uploaded-files.directive.html'
  scope      :
    files: '='
    disabled: '='

angular.module('ap-file-upload').directive 'uploadedFiles', directive

'use strict'

Provider              = require '../provider'
FileUploaderContainer = require('../../../react-components/components/FileUploader/FileUploaderContainer')

directive = (reactDirective) ->
  reactDirective Provider(FileUploaderContainer)

directive.$inject = ['reactDirective']

angular.module('project-creation').directive 'fileUploader', directive

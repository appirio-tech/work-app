'use strict'

CopilotOpenProjectsController = ($scope, UserV3Service) ->
  vm = this

  activate = ->
    vm

  activate()

CopilotOpenProjectsController.$inject = ['$scope', 'UserV3Service']

angular.module('app').controller 'CopilotOpenProjectsController', CopilotOpenProjectsController
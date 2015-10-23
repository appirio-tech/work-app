'use strict'

CopilotOpenProjectsController = ($scope, UserV3Service) ->
  vm = this

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, ->
      user = UserV3Service.getCurrentUser()

      vm.copilotId = user.id if user

    vm

  activate()

CopilotOpenProjectsController.$inject = ['$scope', 'UserV3Service']

angular.module('app').controller 'CopilotOpenProjectsController', CopilotOpenProjectsController
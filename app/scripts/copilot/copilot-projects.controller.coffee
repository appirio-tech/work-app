'use strict'

CopilotProjectsController = ($scope, $stateParams, UserV3Service) ->
  vm = this
  vm.id = $stateParams.id

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, ->
      user = UserV3Service.getCurrentUser()

      vm.copilotId = user.id if user

    vm

  activate()

CopilotProjectsController.$inject = ['$scope', '$stateParams', 'UserV3Service']

angular.module('app').controller 'CopilotProjectsController', CopilotProjectsController

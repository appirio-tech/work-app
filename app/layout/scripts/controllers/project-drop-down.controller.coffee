'use strict'

ProjectDropDownController = (
  $scope
  UserV3Service
  WorkAPIService
  ProjectsAPIService
) ->
  vm          = this
  vm.userType = $scope.userType || 'customer'
  vm.projects = []


  onUserChange = ->
    user = UserV3Service.getCurrentUser()

    if user?.id
      if vm.userType == 'customer'
        resource = WorkAPIService.get()

        resource.$promise.then (response) ->
          vm.projects = response
      else
        params =
          filter: "copilotId=#{user.id}"

        resource = ProjectsAPIService.query params

        resource.$promise.then (response) ->
          vm.copilotProjects = response


  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, onUserChange

    vm

  activate()

ProjectDropDownController.$inject = [
  '$scope'
  'UserV3Service'
  'WorkAPIService'
  'ProjectsAPIService'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectDropDownController', ProjectDropDownController

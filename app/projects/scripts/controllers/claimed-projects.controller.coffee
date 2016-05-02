'use strict'

ClaimedProjectsController = ($scope, ProjectsAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false

  vm.statusMap =
    'INCOMPLETE': 'Setup incomplete'
    'SUBMITTED' : 'Project submitted'
    'ASSIGNED'  : 'Copilot assigned'
    'ESTIMATE'  : 'Project estimated'
    'APPROVED'  : 'Project approved'
    'LAUNCHED'  : 'Project launched'
    'MESSAGED'  : 'Project launched'

  vm.typeMap =
    'DESIGN'       : 'Design'
    'CODE'         : 'Code'
    'DESIGN_AND_CODE': 'Design/Code'

  activate = ->
    $scope.$watch 'copilotId', ->
      setProjects()

    vm

  setProjects = ->
    if $scope.copilotId
      vm.loading = true

      params =
        filter: "copilotId=#{$scope.copilotId}"

      resource = ProjectsAPIService.query params

      resource.$promise.then (response) ->
        vm.projects = response

      resource.$promise.catch (response) ->
        # TODO: handle error

      resource.$promise.finally ->
        vm.loading = false

  activate()

ClaimedProjectsController.$inject = ['$scope', 'ProjectsAPIService']

angular.module('projects').controller 'ClaimedProjectsController', ClaimedProjectsController

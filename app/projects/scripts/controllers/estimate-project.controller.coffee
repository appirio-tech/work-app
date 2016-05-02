'use strict'

EstimateProjectController = ($scope, ProjectsAPIService, ProjectEstimatesAPIService) ->
  vm             = this
  vm.projects    = []
  vm.loading     = false
  vm.permissions = $scope.permissions
  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1
  vm.payload     =
    price:
      min: 0
      max: 0
    duration:
      min: 0
      max: 0
      unit: 'week'

  vm.submit = ->
    vm.loading = true
    params     = id: $scope.projectId
    resource   = ProjectEstimatesAPIService.post params, param: vm.payload

    resource.$promise.then ->
      vm.costEstimate = vm.payload

    resource.$promise.finally ->
      vm.loading = false

  activate = ->
    vm.loading = true
    params     = id: $scope.projectId
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      vm.costEstimate = response.costEstimate

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

EstimateProjectController.$inject = ['$scope', 'ProjectsAPIService', 'ProjectEstimatesAPIService']

angular.module('appirio-tech-ng-projects').controller 'EstimateProjectController', EstimateProjectController

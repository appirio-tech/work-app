'use strict'

EstimateProjectController = ($scope, ProjectsAPIService, ProjectEstimatesAPIService) ->
  vm             = this
  vm.projects    = []
  vm.loading     = false
  vm.projectType = null
  vm.submittedDesignEstimate = null
  vm.submittedCodeEstimate = null
  vm.permissions = $scope.permissions
  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1

  vm.designEstimate =
    type: 'DESIGN'
    price:
      min: 0
      max: 0
    duration:
      min: 0
      max: 0
      unit: 'week'

  vm.codeEstimate =
    type: 'CODE'
    price:
      min: 0
      max: 0
    duration:
      min: 0
      max: 0
      unit: 'week'

  vm.estimatesMissing = ->
    if vm.projectType ==  'DESIGN_AND_CODE'
      !vm.submittedCodeEstimate || !vm.submittedDesignEstimate
    else if vm.projectType == 'DESIGN'
      !vm.submittedDesignEstimate

  vm.submit = ->
    params     = id: $scope.projectId

    if vm.designEstimate.price.max > 0 && vm.submittedDesignEstimate == null
      vm.loading = true
      designResource = ProjectEstimatesAPIService.post(params, param: vm.designEstimate).$promise

      designResource.then ->
        vm.submittedDesignEstimate = vm.designEstimate
        if vm.codeEstimate.price.max > 0 && vm.submittedCodeEstimate == null
          vm.loading = true
          codeResource = ProjectEstimatesAPIService.post(params, param: vm.codeEstimate).$promise

          codeResource.then ->
            vm.submittedCodeEstimate = vm.codeEstimate

          codeResource.finally ->
            vm.loading = false

      designResource.finally ->
        vm.loading = false

    else if vm.codeEstimate.price.max > 0 && vm.submittedCodeEstimate == null
      vm.loading = true
      codeResource = ProjectEstimatesAPIService.post(params, param: vm.codeEstimate).$promise

      codeResource.then ->
        vm.submittedCodeEstimate = vm.codeEstimate

      codeResource.finally ->
        vm.loading = false

  activate = ->
    vm.loading = true
    params     = id: $scope.projectId
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      vm.projectType = response.projectType
      response.projectEstimates?.forEach (estimate) ->
        if estimate.type == 'DESIGN'
          vm.submittedDesignEstimate = estimate
        else if estimate.type == 'CODE'
          vm.submittedCodeEstimate = estimate

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

EstimateProjectController.$inject = ['$scope', 'ProjectsAPIService', 'ProjectEstimatesAPIService']

angular.module('projects').controller 'EstimateProjectController', EstimateProjectController

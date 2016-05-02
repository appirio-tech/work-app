'use strict'

OpenProjectsController = ($scope, CopilotUnclaimedProjectsAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false
  vm.typeMap  =
    'DESIGN'       : 'Design'
    'CODE'         : 'Code'
    'DESIGN_AND_CODE': 'Design/Code'

  activate = ->
    getProjects()

    vm

  orderProjectsByCreationDate = (projects) ->
    orderedProjects = projects?.sort (previous, next) ->
      new Date(next.createdAt) - new Date(previous.createdAt)

  getProjects = ->
    vm.loading = true

    resource = CopilotUnclaimedProjectsAPIService.query()

    resource.$promise.then (response) ->
      vm.projects = orderProjectsByCreationDate response

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

  activate()

OpenProjectsController.$inject = ['$scope', 'CopilotUnclaimedProjectsAPIService']

angular.module('appirio-tech-ng-projects').controller 'OpenProjectsController', OpenProjectsController

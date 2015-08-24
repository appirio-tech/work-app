'use strict'

config = ($stateProvider) ->
  states = {}

  states['view-projects'] =
    url         : '/projects'
    templateUrl : 'views/projectTabs.html'
    controller  : 'ProjectsTabController'
    controllerAs: 'vm'
    title       : 'View Projects'
    abstract    : true

  getAssignedProjects = (ProjectsService) ->
    ProjectsService.getAssignedProjects()

  states['view-projects.assigned'] =
    url         : '/assigned'
    templateUrl : 'views/projects.html'
    controller  : 'ProjectsController'
    controllerAs: 'vm'

  getWorkRequests = (ProjectsService) ->
    ProjectsService.getWorkRequests()

  states['view-projects.open'] =
    url         : '/open'
    templateUrl : 'views/projects.html'
    controller  : 'ProjectsController'
    controllerAs: 'vm'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('ap-copilot-flow.projects').config config


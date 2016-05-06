store = require '../../../store.coffee'
projectSearchActions = require '../../../store/actions/projectSearch.js'

NgProjectsController = ($scope, WorkAPIService, ProjectsAPIService) ->
  vm          = this
  vm.projects = []
  vm.loading  = false

  vm.statusMap =
    'INCOMPLETE': 'Setup Incomplete'
    'SUBMITTED' : 'Project Submitted'
    'ASSIGNED'  : 'Copilot Assigned'
    'ESTIMATED' : 'Project Estimated'
    'APPROVED'  : 'Project Approved'
    'LAUNCHED'  : 'Project Launched'
    'MESSAGED'  : 'Project Launched'
    'COMPLETE'  : 'Project Completed'

  vm.typeMap =
    'DESIGN'       : 'Design'
    'CODE'         : 'Code'
    'DESIGN_AND_CODE': 'Design/Code'

  projectIds = []

  store.subscribe ->
    items = store.getState().projectSearch.items
    projects = store.getState().entities.projects

    unless projectIds == items
      projectIds = items

      vm.projects = items.map (id) ->
        projects[id]

      unless $scope.$$phase
        $scope.$digest()

  store.dispatch(projectSearchActions.loadProjectSearch())

  vm

NgProjectsController.$inject = ['$scope', 'WorkAPIService', 'ProjectsAPIService']

angular.module('projects').controller 'NgProjectsController', NgProjectsController

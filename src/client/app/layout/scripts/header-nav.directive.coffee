'use strict'

# TODO: use controller pattern
# TODO: unit tests
# TODO: turn this into its own component

dir = (ManageService, UserService) ->
  link = (scope, element, attrs) ->
    currentUser = ->
      UserService.user

    getProjects = (user) ->
      if user?.handle
        ManageService.getWorkRequests().then (projects) ->
          scope.projects = projects

      else
        scope.projects = []
    scope.$watch currentUser, getProjects

  restrict: 'E'
  link: link
  templateUrl: 'layout/views/header-nav.html'



dir.$inject = ['ManageService', 'UserService']

angular.module('app.layout').directive 'headerNav', dir

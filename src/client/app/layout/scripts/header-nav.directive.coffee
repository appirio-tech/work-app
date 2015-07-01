'use strict'

# TODO: use controller pattern
# TODO: unit tests
# TODO: turn this into its own component

dir = (ManageService, UserV3Service) ->
  link = (scope, element, attrs) ->
    getProjects = ->
      user = UserV3Service.getCurrentUser()

      if user?.handle
        ManageService.getWorkRequests().then (projects) ->
          scope.projects = projects

      else
        scope.projects = []

    scope.$watch UserV3Service.getCurrentUser, getProjects

  restrict: 'E'
  link: link
  templateUrl: 'layout/views/header-nav.html'



dir.$inject = ['ManageService', 'UserV3Service']

angular.module('app.layout').directive 'headerNav', dir

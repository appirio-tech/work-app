'use strict'

# TODO: use controller pattern
# TODO: unit tests
# TODO: turn this into its own component

dir = (WorkAPIService, UserV3Service) ->
  link = (scope, element, attrs) ->
    getProjects = ->
      user = UserV3Service.getCurrentUser()

      if user?.handle
        resource = WorkAPIService.get()

        resource.$promise.then (response) ->
          scope.projects = response
      else
        scope.projects = []

    scope.$watch UserV3Service.getCurrentUser, getProjects

  restrict: 'E'
  link: link
  templateUrl: 'layout/views/header-nav.html'



dir.$inject = ['WorkAPIService', 'UserV3Service']

angular.module('app.layout').directive 'headerNav', dir

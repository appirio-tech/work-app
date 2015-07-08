'use strict'

dir = () ->
  controller: ($scope, $state, $rootScope) ->
    # using $rootScope because layout stuff happens outside
    # of the ui-view
    $rootScope.$on '$stateChangeSuccess', () ->
      if $state.current.name in ['timeline', 'messaging']
        $scope.show = true
      else
        $scope.show = false

    $scope.show = false

  restrict: 'E'
  templateUrl: 'layout/views/project-nav.html'



dir.$inject = ['$scope', '$state', '$rootScope']

angular.module('app.layout').directive 'projectNav', dir

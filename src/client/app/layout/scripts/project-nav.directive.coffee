'use strict'

dir = () ->
  controller: ($scope, $state, $rootScope) ->
    # using $rootScope because layout stuff happens outside
    # of the ui-view
    $rootScope.$on '$stateChangeSuccess', () ->
      states= ['timeline',
               'messaging',
               'submissions',
               'submission-slides',
               'submission-detail']

      if $state.current.name in states
        $scope.show = true
      else
        $scope.show = false

    $scope.show = false

  restrict: 'E'
  templateUrl: 'layout/views/project-nav.html'


angular.module('app.layout').directive 'projectNav', dir

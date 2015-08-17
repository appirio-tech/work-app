'use strict'

#TODO: get rid of this directive

dir = ($state, $rootScope) ->
  link: (scope, element, attrs) ->
    # using $rootScope because layout stuff happens outside
    # of the ui-view
    $rootScope.$on '$stateChangeSuccess', () ->
      states= ['timeline',
               'messaging',
               'submissions',
               'submission-slides',
               'submission-detail']

      if $state.current.name in states
        scope.show = true
      else
        scope.show = false

      scope.workId = $state.params?.workId || $state.params?.id

    scope.show = false


  restrict: 'E'
  templateUrl: 'layout/views/project-nav.html'


dir.$inject = ['$state', '$rootScope']

angular.module('app.layout').directive 'projectNav', dir

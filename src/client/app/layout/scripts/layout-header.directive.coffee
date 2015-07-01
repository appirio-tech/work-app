'use strict';

# TODO: use controller pattern
# TODO: unit tests
# TODO: turn this into its own component

dir = (UserV3Service, ThreadsAPIService) ->
  link = (scope, element, attrs) ->
    currentUser = ->
      UserV3Service.getCurrentUser()

    onUserChange = (user) ->
      if user?.id
        scope.showNotification = true
        scope.subscriberId     = user.id

        getNotificationCount user.id
      else
        scope.showNotification = false

    getNotificationCount = (id) ->
      queryParams =
        subscriberId: id

      resource = ThreadsAPIService.query queryParams

      resource.$promise.then (response) ->
        scope.unreadCount = response.totalUnreadCount

    scope.$watch currentUser, onUserChange

  restrict: 'A'
  link: link

dir.$inject = ['UserV3Service', 'ThreadsAPIService']

angular.module('app.layout').directive 'layoutHeader', dir


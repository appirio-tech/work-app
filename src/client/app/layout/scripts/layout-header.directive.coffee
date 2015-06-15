'use strict';

dir = (AuthService) ->
  link = (scope, element, attrs) ->
    scope.showNotification = ->
      true if AuthService.isAuthenticated()

  restrict: 'A'
  link: link

dir.$inject = ['AuthService']

angular.module('app.layout').directive 'layoutHeader', dir


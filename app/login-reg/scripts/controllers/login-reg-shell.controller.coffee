'use strict'

LoginRegShellController = ($scope) ->
  vm = this
  vm.flow = $scope.flow || 'LOGIN'

  activate = ->
    vm

  activate()

LoginRegShellController.$inject = ['$scope']

angular.module('appirio-tech-ng-login-reg').controller 'LoginRegShellController', LoginRegShellController

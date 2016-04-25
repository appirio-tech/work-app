'use strict'

SubmitWorkCompleteController = ($scope, $rootScope, $state) ->
  vm = this
  vm.show = true
  vm.appName = $rootScope.currentAppName

  activate = ->
    $scope.$watch 'vm.show', (newValue) ->
      $state.go 'view-work-multiple' if newValue == false

    vm

  activate()

SubmitWorkCompleteController.$inject = ['$scope', '$rootScope', '$state']

angular.module('project-creation').controller 'SubmitWorkCompleteController', SubmitWorkCompleteController
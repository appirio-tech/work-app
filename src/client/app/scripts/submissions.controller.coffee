'use strict'

SubmissionsPageController = ($scope) ->
  vm        = this
  vm.workId = $scope.workId

  vm

SubmissionsPageController.$inject = ['$scope']

angular.module('app').controller 'SubmissionsPageController', SubmissionsPageController

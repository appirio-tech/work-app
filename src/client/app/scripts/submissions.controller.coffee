'use strict'

SubmissionsPageController = ($stateParams, $scope) ->
  vm        = this
  vm.workId = $stateParams.id

  vm

SubmissionsPageController.$inject = ['$stateParams', '$scope']

angular.module('app').controller 'SubmissionsPageController', SubmissionsPageController

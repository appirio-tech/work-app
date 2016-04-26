'use strict'

FinalDevelopmentController = ($scope) ->
  vm = this
  vm.text = $scope.text
  vm.files = $scope.files
  vm.links = $scope.links

  vm

FinalDevelopmentController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FinalDevelopmentController', FinalDevelopmentController
'use strict'

SlidesDetailsPageController = ($scope) ->
  vm              = this
  vm.workId       = $scope.workId
  vm.submissionId = $scope.submissionId

  vm

SlidesDetailsPageController.$inject = ['$scope']

angular.module('app').controller 'SlidesDetailsPageController', SlidesDetailsPageController

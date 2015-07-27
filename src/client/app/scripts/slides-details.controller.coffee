'use strict'

SlidesDetailsPageController = ($stateParams, $scope) ->
  vm              = this
  vm.workId       = $stateParams.id
  vm.submissionId = $stateParams.id

  vm

SlidesDetailsPageController.$inject = ['$stateParams', '$scope']

angular.module('app').controller 'SlidesDetailsPageController', SlidesDetailsPageController

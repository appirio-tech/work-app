'use strict'

ProjectDetailsPageController = ($stateParams) ->
  vm = this
  vm.id = $stateParams.id

  vm

ProjectDetailsPageController.$inject = ['$stateParams']

angular.module('app').controller 'ProjectDetailsPageController', ProjectDetailsPageController

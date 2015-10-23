'use strict'

CustomerProjectDetailsPageController = ($stateParams) ->
  vm = this
  vm.id = $stateParams.id

  vm

CustomerProjectDetailsPageController.$inject = ['$stateParams']

angular.module('app').controller 'CustomerProjectDetailsPageController', CustomerProjectDetailsPageController

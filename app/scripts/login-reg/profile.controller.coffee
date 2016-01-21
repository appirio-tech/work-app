'use strict'

store = require '../../store'

ProfilePageController = ($stateParams) ->
  vm         = this
  vm.store   = store

  vm

ProfilePageController.$inject = ['$stateParams']

angular.module('app').controller 'ProfilePageController', ProfilePageController
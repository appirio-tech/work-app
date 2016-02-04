'use strict'

store = require '../store'

# This is a shared controller for all submissions pages
BasicController = ($state, $stateParams, UserV3Service) ->
  vm = this

  angular.extend vm, $stateParams
  angular.extend vm, $state.current.data || {}

  vm.store = store
  user     = UserV3Service.getCurrentUser()

  if user
    vm.userId   = user.id
    vm.userRole = user.role

  vm

BasicController.$inject = ['$state', '$stateParams', 'UserV3Service']

angular.module('app').controller 'BasicController', BasicController
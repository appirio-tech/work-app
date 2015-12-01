'use strict'

SSOCallbackPageController = ($stateParams) ->
  vm         = this
  vm.token   = $stateParams.userJWTToken
  vm.status  = $stateParams.status
  vm.message = $stateParams.message

  vm

SSOCallbackPageController.$inject = ['$stateParams']

angular.module('app').controller 'SSOCallbackPageController', SSOCallbackPageController
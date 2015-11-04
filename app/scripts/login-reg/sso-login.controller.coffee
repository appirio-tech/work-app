'use strict'

SSOLoginPageController = ($stateParams) ->
  vm     = this
  vm.org = $stateParams.org

  vm

SSOLoginPageController.$inject = ['$stateParams']

angular.module('app').controller 'SSOLoginPageController', SSOLoginPageController
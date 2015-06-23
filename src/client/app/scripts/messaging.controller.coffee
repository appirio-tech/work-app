'use strict'

MessagingPageController = ($stateParams) ->
  vm = this
  vm.threadId = $stateParams.id

MessagingPageController.$inject = ['$stateParams']

angular.module('app').controller 'MessagingPageController', MessagingPageController

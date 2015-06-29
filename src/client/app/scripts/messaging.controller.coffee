'use strict'

MessagingPageController = ($stateParams, $window) ->
  vm = this
  vm.threadId = $stateParams.id

  vm.back = ->
    $window.history.back();

MessagingPageController.$inject = ['$stateParams', '$window']

angular.module('app').controller 'MessagingPageController', MessagingPageController

'use strict'

MessagingPageController = ($stateParams, $window, UserV3Service, $scope) ->
  vm              = this
  vm.threadId     = $stateParams.id
  vm.subscriberId = null

  vm.back = ->
    $window.history.back()

  $scope.$watch UserV3Service.getCurrentUser, ->
    user            = UserV3Service.getCurrentUser()
    vm.subscriberId = user.id if user

  vm

MessagingPageController.$inject = ['$stateParams', '$window', 'UserV3Service', '$scope']

angular.module('app').controller 'MessagingPageController', MessagingPageController

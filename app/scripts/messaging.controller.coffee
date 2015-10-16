'use strict'

MessagingPageController = ($stateParams, $state, $window, UserV3Service, $scope) ->
  vm              = this
  vm.workId       = $stateParams.id
  vm.threadId     = $stateParams.threadId
  vm.isClient     = $state.current.name == 'messaging'
  vm.subscriberId = null

  vm.back = ->
    $window.history.back()

  $scope.$watch UserV3Service.getCurrentUser, ->
    user            = UserV3Service.getCurrentUser()
    vm.subscriberId = user.id if user

  vm

MessagingPageController.$inject = ['$stateParams', '$state', '$window', 'UserV3Service', '$scope']

angular.module('app').controller 'MessagingPageController', MessagingPageController

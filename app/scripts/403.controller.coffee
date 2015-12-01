'use strict'

FourOThreeController = ($scope, $stateParams, UserV3Service) ->
  vm        = this
  vm.workId = $stateParams.id
  vm.userType = null

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, (user) ->
      if user
        vm.userType = user.role

  activate()

  vm


FourOThreeController.$inject = ['$scope', '$stateParams', 'UserV3Service']

angular.module('app').controller '403Controller', FourOThreeController
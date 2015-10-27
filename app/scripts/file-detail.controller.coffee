'use strict'

FileDetailPageController = ($scope, $stateParams, $state, $rootScope) ->
  vm              = this
  vm.projectId    = $stateParams.projectId
  vm.stepId       = $stateParams.stepId
  vm.submissionId = $stateParams.submissionId
  vm.fileId       = $stateParams.fileId
  vm.showModal    = $stateParams.modal != null


  $scope.$watch 'vm.showModal', (newVal) ->
    if newVal == false
      defaultCloseParams =
        projectId: vm.projectId
        stepId: vm.stepId
        submissionId: vm.submissionId

      closeState  = $rootScope.preFileDetailState?.name || 'submission-detail'
      closeParams = $rootScope.preFileDetailParams || defaultCloseParams

      $state.go closeState, closeParams

  vm

FileDetailPageController.$inject = ['$scope', '$stateParams', '$state', '$rootScope']

angular.module('app').controller 'FileDetailPageController', FileDetailPageController
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
      if $rootScope.preFileDetailState.name
        $state.go $rootScope.preFileDetailState.name, $rootScope.preFileDetailParams

  vm

FileDetailPageController.$inject = ['$scope', '$stateParams', '$state', '$rootScope']

angular.module('app').controller 'FileDetailPageController', FileDetailPageController
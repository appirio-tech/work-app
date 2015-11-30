'use strict'

# This is a shared controller for all submissions pages
SubmissionsPagesController = ($scope, $state, $stateParams, $rootScope, UserV3Service, project) ->
  vm              = this
  vm.projectId    = $stateParams.projectId
  vm.stepId       = $stateParams.stepId
  vm.submissionId = $stateParams.submissionId
  vm.fileId       = $stateParams.fileId
  vm.showModal    = $stateParams.modal != null

  activate = ->
    userId  = UserV3Service.getCurrentUser().userId

    if userId == project.ownerId
      vm.userType = 'customer'
    else if userId == project.copilotId
      vm.userType = 'copilot'
    else
      vm.userType = 'member'

    # For file detail only
    $scope.$watch 'vm.showModal', (newVal) ->
      if newVal == false
        defaultCloseParams =
          projectId: vm.projectId
          stepId: vm.stepId
          submissionId: vm.submissionId

        closeState  = $rootScope.preFileDetailState?.name || 'submission-detail'
        closeParams = $rootScope.preFileDetailParams || defaultCloseParams

        $state.go closeState, closeParams

  activate()

  vm

SubmissionsPagesController.$inject = ['$scope', '$state', '$stateParams', '$rootScope', 'UserV3Service', 'project']

angular.module('app').controller 'SubmissionsPagesController', SubmissionsPagesController
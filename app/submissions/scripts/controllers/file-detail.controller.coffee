'use strict'

FileDetailController = ($scope, $state, DataService, StepSubmissionsService, SubmissionsService) ->
  vm              = this
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.fileId       = $scope.fileId
  vm.userType     = $scope.userType

  vm

FileDetailController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController
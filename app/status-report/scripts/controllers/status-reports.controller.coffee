'use strict'

StatusReportsController = ($scope, StatusReportAPIService) ->
  vm             = this
  vm.workId      = $scope.workId
  vm.stepId      = $scope.stepId
  vm.permissions = $scope.permissions || ['CREATE', 'UPDATE', 'DELETE']

  activate = ->
    vm

  activate()

StatusReportsController.$inject = ['$scope', 'StatusReportAPIService']

angular.module('status-report').controller 'StatusReportsController', StatusReportsController
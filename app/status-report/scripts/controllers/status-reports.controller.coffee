'use strict'

StatusReportsController = ($scope, API_URL, StatusReportAPIService) ->
  vm             = this
  vm.workId      = $scope.workId
  vm.stepId      = $scope.stepId
  vm.permissions = $scope.permissions || ['CREATE', 'UPDATE', 'DELETE']

  activate = ->
    vm

  activate()

StatusReportsController.$inject = ['$scope', 'API_URL', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'StatusReportsController', StatusReportsController
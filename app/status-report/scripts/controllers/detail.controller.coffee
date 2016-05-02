'use strict'

DetailController = ($scope, StatusReportDetailAPIService) ->
  vm          = this
  vm.workId   = $scope.workId
  vm.reportId = $scope.reportId

  activate = ->
    params =
      reportId: vm.reportId

    resource = StatusReportDetailAPIService.get params

    resource.$promise.then (response) ->
      vm.report = response

    resource.$promise.finally ->

    vm

  activate()

DetailController.$inject = ['$scope', 'StatusReportDetailAPIService']

angular.module('appirio-tech-ng-status-report').controller 'DetailController', DetailController
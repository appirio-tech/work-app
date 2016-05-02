'use strict'

PastReportsController = ($scope, StatusReportCollectionAPIService) ->
  vm        = this
  vm.workId = $scope.workId

  activate = ->
    params =
      workId: vm.workId

    resource = StatusReportCollectionAPIService.query params

    resource.$promise.then (response) ->
      vm.pastReports = response

    resource.$promise.finally ->

    vm

  activate()

PastReportsController.$inject = ['$scope', 'StatusReportCollectionAPIService']

angular.module('appirio-tech-ng-status-report').controller 'PastReportsController', PastReportsController
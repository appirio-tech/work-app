'use strict'

StatusReportDetailsController = ($stateParams) ->
  vm          = this
  vm.workId   = $stateParams.id
  vm.reportId = $stateParams.reportId

  vm

StatusReportDetailsController.$inject = ['$stateParams']

angular.module('app').controller 'StatusReportDetailsController', StatusReportDetailsController
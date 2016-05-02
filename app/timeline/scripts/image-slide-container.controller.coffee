'use strict'

ImageSlideContainerController = ($scope, StatusReportDetailAPIService) ->
  vm                = this
  vm.projectId      = $scope.projectId
  vm.reportId       = $scope.reportId
  vm.startingFileId = $scope.startingFileId
  vm.handle         = $scope.handle
  vm.avatar         = $scope.avatar
  vm.reportDate     = $scope.reportDate
  vm.modalActive    = false

  findStartingFile = (files) ->
    startingFile = files[0]

    files.forEach (file) ->
      if file.fileId == vm.startingFileId
        startingFile = file

    startingFile

  extractUrls = (files) ->
    urlFiles = files.map (file) ->
      file.url = file.preSignedURL
      file

    urlFiles

  activate = ->
    params =
      reportId: vm.reportId

    resource = StatusReportDetailAPIService.get params

    resource.$promise.then (data) ->
      vm.modalActive = true

      vm.images = extractUrls data.images

      vm.startingFile = findStartingFile vm.images


    resource.$promise.catch ->

    resource.$promise.finally ->

    vm

  activate()

ImageSlideContainerController.$inject = ['$scope', 'StatusReportDetailAPIService']

angular.module('appirio-tech-ng-timeline').controller 'ImageSlideContainerController', ImageSlideContainerController
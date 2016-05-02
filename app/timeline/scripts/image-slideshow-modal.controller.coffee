'use strict'

ImageSlideShowModalController = ($scope, $filter) ->
  vm                   = this
  vm.files             = $scope.files
  vm.file              = null
  vm.startingFile      = $scope.startingFile
  vm.handleClose       = $scope.handleClose
  vm.handle            = $scope.handle
  vm.avatar            = $scope.avatar
  vm.reportDate        = $scope.reportDate
  vm.showNotifications = false
  vm.showModal         = true
  date                 = $filter('date')(vm.reportDate, "MMMM d")
  vm.title             = "#{date} Status Report"

  vm.onFileChange = (file) ->
    vm.file = file
    vm.downloadUrl = file?.url

  activate = ->
    $scope.$watch 'vm.showModal', (newValue, oldValue) ->
      if oldValue && !newValue
        vm.handleClose()

    vm

  activate()

ImageSlideShowModalController.$inject = ['$scope', '$filter']

angular.module('appirio-tech-ng-timeline').controller 'ImageSlideShowModalController', ImageSlideShowModalController
'use strict'

FileDetailSlideController = ($scope) ->
  vm                 = this

  vm.generateProfileUrl = (handle) ->
    "https://www.topcoder.com/members/#{handle}"

  vm.onFileChange = (file) ->
    vm.file = file
    $scope.onFileChange
      file: file

  vm

FileDetailSlideController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideController', FileDetailSlideController
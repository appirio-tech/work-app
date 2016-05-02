'use strict'

FileRowController = ($scope) ->
  vm = this

  render = ->
    limit = $scope.limit || 5
    files = $scope.files || []
    last  = (Math.min files.length, limit) - 1

    vm.viewAllUrl = $scope.viewAllUrl
    vm.more       = if files.length > limit then files.length - limit else 0
    vm.viewMore   = files.length > limit
    vm.viewAll    = files.length <= limit
    vm.files      = files.slice 0, limit

    vm.files[last]?.isLast = true

  $scope.$watch 'files', render, true

  vm

FileRowController.$inject = ['$scope']

angular.module('submissions').controller 'FileRowController', FileRowController
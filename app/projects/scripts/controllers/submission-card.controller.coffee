'use strict'

SubmissionCardController = ($scope) ->
  vm = this

  activate = ->
    vm.id     = $scope.id
    vm.stepId = $scope.stepId
    vm.phase  = $scope.phase || 'Design Concepts'
    vm.end    = $scope.end

    vm

  activate()

SubmissionCardController.$inject = ['$scope']

angular.module('projects').controller 'SubmissionCardController', SubmissionCardController

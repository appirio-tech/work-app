'use strict'

ManageController = ->
  vm       = this
  vm.title = 'Work Requests'

  activate = ->
    vm

  activate()

ManageController.$inject = []

angular.module('app.manage').controller 'ManageController', ManageController
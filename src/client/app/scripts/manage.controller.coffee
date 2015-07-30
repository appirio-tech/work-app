'use strict'

ManageController = ->
  vm       = this

  activate = ->
    vm

  activate()

ManageController.$inject = []

angular.module('app.manage').controller 'ManageController', ManageController
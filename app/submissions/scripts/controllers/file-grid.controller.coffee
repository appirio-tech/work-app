'use strict'

FileGridController = ->
  vm = this

  vm.isImage = (file) ->
    pattern = new RegExp('image.*')
    pattern.test(file.type)

  vm

angular.module('submissions').controller 'FileGridController', FileGridController
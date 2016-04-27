'use strict'

{ setFileUploader } = require '../../../store/actions/setFileUploader.js'

SubmitWorkUploadRequirementsController = ($scope, $rootScope, $state, SubmitWorkService) ->
  if $scope.workId
    localStorageKey               = "recentSubmitWorkSection-#{$scope.workId}"
    localStorage[localStorageKey] = 'upload-requirements'

  vm          = this
  vm.show     = true
  vm.appName  = $rootScope.currentAppName
  vm.workId   = $scope.workId
  vm.store    = $scope.store
  permissions = $scope.permissions || ['ALL']
  vm.readOnly = permissions.indexOf('UPDATE') == -1 && permissions.indexOf('ALL') == -1
  vm.dragAndDrop = true

  vm.kickOffProject = ->
    uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors
    updates =
      status: 'SUBMITTED'

    if uploaderValid
      SubmitWorkService.save(updates).then ->
        $state.go 'submit-work-complete', { id: vm.workId }

  configureUploader = ->
    uploaderOptions =
      id            : vm.workId
      category      : 'work'
      assetType     : 'requirements'
      enableCaptions: false

    vm.store.dispatch setFileUploader uploaderOptions

  onChange = ->
    work = SubmitWorkService.get()

  activate = ->
    $scope.$watch 'vm.show', (newValue, oldValue) ->
      if oldValue && !newValue
        if vm.uploaderUploading
          vm.showUploadModal = true
        else
          $state.go 'view-work-multiple'

    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)

    configureUploader()

    vm

  activate()

SubmitWorkUploadRequirementsController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService']

angular.module('project-creation').controller 'SubmitWorkUploadRequirementsController', SubmitWorkUploadRequirementsController
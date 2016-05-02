'use strict'

CreateController = ($scope, $state, API_URL, StatusReportAPIService) ->
  vm                   = this
  vm.workId            = $scope.workId
  vm.stepId            = $scope.stepId
  vm.permissions       = $scope.permissions
  vm.uploaderUploading = null
  vm.uploaderHasErrors = null
  vm.uploaderHasFiles  = null
  vm.uploaderFiles     = null
  vm.currentLink       = ''
  vm.statusReport      =
    text: null
    links: []
    images: []
    isFinal: false

  isValid = (report) ->
    report.text != null && !vm.uploaderHasErrors && !vm.uploaderUploading

  isUnique = (link) ->
    unique = true
    vm.statusReport.links.forEach (vmLink) ->
      if vmLink.url == link
        unique = false

    unique

  vm.addLink = ->
    if vm.currentLink?.length && isUnique vm.currentLink
      vm.statusReport.links.push
        url: vm.currentLink

      vm.currentLink = ''

  vm.removeLink = (link) ->
    vm.statusReport.links.forEach (vmLink, index) ->
      if vmLink.url == link.url
        vm.statusReport.links.splice(index, 1)

  vm.addImage = (data) ->
    imageUploaded = false

    vm.statusReport.images.forEach (image) ->
      if image.fileId == data.fileId
        imageUploaded = true
        image.caption = data.caption

    if !imageUploaded
      vm.statusReport.images.push data


  vm.create = ->
    if isValid vm.statusReport
      params =
        workId: vm.workId
        stepId: vm.stepId

      body =
        param:
          vm.statusReport

      resource = StatusReportAPIService.post params, body

      resource.$promise.then (response) ->
        $state.go 'copilot-status-report-details', {id: vm.workId, reportId: response.id}

      resource.$promise.finally ->

  configureUploader = (workId, assetType) ->
    domain = API_URL
    category = 'work'

    uploaderConfig =
      name: "#{assetType}-uploader-#{workId}-#{Date.now()}"
      allowMultiple: true
      allowCaptions: true
      disabled     : vm.permissions.indexOf('CREATE') == -1
      onCaptionChange: (data) ->
        vm.addImage
          caption: data.caption
          fileId:  data.id
          path:    data.path
          type:    data.type
      onUploadSuccess: (data) ->
        vm.addImage
          caption:  data.caption
          fileId:   data.id
          path:     data.path
          type:     data.type

      presign:
        url: domain + '/v3/attachments/uploadurl'
        params:
          id: workId
          assetType: assetType
          category: category
      createRecord:
        url: domain + '/v3/attachments'
        params:
          id: workId
          assetType: assetType
          category: category
      removeRecord:
        url: domain + '/v3/attachments/:fileId'
        params:
          filter: 'category=' + category

    uploaderConfig

  activate = ->
    vm.uploaderConfig = configureUploader(vm.workId, 'status-report-image')

    vm

  activate()

CreateController.$inject = ['$scope', '$state', 'API_URL', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'CreateController', CreateController
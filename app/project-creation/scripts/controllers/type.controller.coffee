'use strict'

SubmitWorkTypeController = ($scope, $rootScope, $state, $document, SubmitWorkService, ProjectsAPIService, RequirementService) ->
  vm                       = this
  vm.loading               = false
  vm.showSuccessModal      = false
  vm.nameError             = false
  vm.platformsError        = false
  vm.devicesError          = false
  vm.orientationError      = false
  vm.projectTypeError      = false
  vm.briefError            = false
  vm.createError           = false
  vm.otherPlatformSelected = false
  vm.isOtherPlatform       = false
  userProjectNames         = null
  permissions              = $scope.permissions || ['ALL']
  vm.readOnly              = permissions.indexOf('UPDATE') == -1 && permissions.indexOf('ALL') == -1

  # TODO: move route directing out of here
  if $scope.workId
    localStorageKey = "recentSubmitWorkSection-#{$scope.workId}"

    if vm.isOtherPlatform
      recent = 'upload-requirements'
    else
      recent = localStorage[localStorageKey] || 'features'

    $state.go "submit-work-#{recent}", { id: $scope.workId }

  vm.name         = ''
  vm.devices      = angular.copy RequirementService.devices
  vm.platforms    = angular.copy RequirementService.platforms
  vm.orientations = angular.copy RequirementService.orientations
  vm.projectTypes = angular.copy RequirementService.projectTypes
  vm.brief        = ''

  vm.getIconPath = (name, selected=false) ->
    if selected
      require "./../../images/#{name}-selected.svg"
    else
      require "./../../images/#{name}.svg"

  vm.toggleSelection = (model, value, sectionName, vmModel) ->
    model.selected = !value
    vm.validateSection(sectionName, vmModel)

  vm.makeSelection = (model, value, sectionName, vmModel) ->
    if vm[model] == value
      vm[model] = null
    else
      vm[model] = value
    vm.validateSection(sectionName, vmModel)

  vm.showOrientation = ->
    showOrientation = true
    selectedDevices = {}

    selected = vm.devices.filter (device) ->
      device.selected

    selected.forEach (device) ->
      if device.name == 'Watch'
        selectedDevices['Watch'] = true
      else if device.name == 'Desktop'
        selectedDevices['Desktop'] = true

    if selected.length == 0 || (selected.length == 1 && (selectedDevices.Watch || selectedDevices.Desktop )) || (selected.length == 2 && (selectedDevices.Watch && selectedDevices.Desktop ))
      showOrientation = false

    showOrientation

  vm.interceptSubmit = (event) ->
    if event.keyCode == 13 || event.which == 13
      event.preventDefault()
      event.stopPropagation()
      if vm.name.length > 0
        scrollElement = angular.element document.getElementById 'platform-details'
        $document.scrollToElementAnimated scrollElement
      else
        vm.validateSection('platform-details', 'name', true)

  vm.validateSection = (nextId, models, scrollActivated) ->
    nextSection = angular.element document.getElementById nextId
    foundErrors = false

    if Array.isArray models
      foundModelErrors = false

      models.forEach (model) ->
        modelError = "#{model}Error"
        selected = vm[model].filter (individualModel) ->
          individualModel.selected

        if selected.length == 0
          vm[modelError] = true
          foundModelErrors = true
        else
          vm[modelError] = false

      if foundModelErrors
        foundErrors = true
      else
        foundErrors = false

    else
      model = models
      modelError = "#{model}Error"
      if vm[model]?.length
        if (userProjectNames?.indexOf vm[model].toLowerCase() ) > -1 && (model == 'name')
          vm[modelError] = true
          foundErrors = true
        else
          vm[modelError] = false
          foundErrors = false
      else
        vm[modelError] = true
        foundErrors = true

    if scrollActivated
      unless foundErrors
        $document.scrollToElementAnimated nextSection

  vm.validateAllSections = ->
    if !vm.otherPlatformSelected
      vm.validateSection('platform-details', 'name')
      vm.validateSection('device-details', ['platforms'])
      vm.validateSection('type-details', ['devices', 'orientations'])
      vm.validateSection('brief-details', 'projectType')
      vm.validateSection('brief-details', 'brief')
    else
      vm.validateSection('platform-details', 'name')
      vm.validateSection('brief-details', ['platforms'])
      vm.validateSection('brief-details', 'brief')

    foundErrors = false
    errorElement = null

    setErrorElement = (elementId) ->
      foundErrors = true
      errorElement = angular.element document.getElementById elementId

      if elementId == 'app-name'
         $document.scrollTopAnimated(0)
      else
        $document.scrollToElementAnimated errorElement

    if vm.briefError
      setErrorElement('brief-details')

    if vm.projectTypeError
      setErrorElement('type-details')

    if vm.orientationsError
      setErrorElement('orientation-details')

    if vm.devicesError
      setErrorElement('device-details')

    if vm.platformsError
      setErrorElement('platform-details')

    if vm.nameError
      setErrorElement('app-name')

    unless foundErrors
      vm.create()

  vm.toggleOtherPlatform = ->
    vm.otherPlatformSelected = !vm.otherPlatformSelected

    if vm.otherPlatformSelected
      vm.platforms.forEach (platform) ->
        if platform.name != 'Other'
          platform.selected = false
        else
          platform.selected = true
    else
      vm.platforms.forEach (platform) ->
        if platform.name == 'Other'
          platform.selected = false

    vm.validateSection('device-details', ['platforms'] )

  vm.create = ->
    vm.createError = false
    updates = getUpdates()
    updates.status = 'INCOMPLETE'

    if isValid(updates)
      vm.loading = true

      success = (res) ->
        work = SubmitWorkService.get()

        if vm.otherPlatformSelected
          $state.go 'submit-work-upload-requirements', { id: work.id }
        else
          $state.go 'submit-work-features', { id: work.id }

      failure = (err) ->
        vm.loading = false
        vm.createError = true

      SubmitWorkService.create(updates).then(success, failure)

  isValid = (updates) ->
    valid = true

    unless updates.projectType == 'DESIGN' || updates.projectType == 'DESIGN_AND_CODE'
      valid = false

    unless updates.name.length > 0
      valid = false

    unless updates.brief.length > 0
      valid = false

    unless updates.platformIds.length > 0
      valid = false

    unless vm.otherPlatformSelected
      unless updates.deviceIds.length > 0
        valid = false

      unless updates.orientationIds.length > 0
        valid = false

    valid

  getUpdates = ->
    isSelected = (item) ->
      item.selected

    getId = (item) ->
      item.id

    # TODO: Remove this work-around for 'other' platform option
    if vm.platforms.filter(isSelected).map(getId)[0] == 'OTHER'
      vm.projectType = 'DESIGN_AND_CODE'
      vm.orientations = []
      vm.deviceIds = []

    updates =
      projectType   : vm.projectType.trim()
      name          : vm.name.trim()
      brief         : vm.brief.trim()
      platformIds   : vm.platforms.filter(isSelected).map(getId)
      deviceIds     : vm.devices.filter(isSelected).map(getId)
      orientationIds: vm.orientations.filter(isSelected).map(getId)

  activate = ->
    resource = ProjectsAPIService.query()

    resource.$promise.then (response) ->
      response?.forEach (project) ->
        if project.id == $scope.workId
          if (project.platformIds.length == 1) && (project.platformIds[0] == 'OTHER')
            vm.isOtherPlatform = true

      projectNames = response?.map (project) ->
        project.name.toLowerCase()

      userProjectNames = projectNames || []


  activate()

  vm

SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', '$document', 'SubmitWorkService', 'ProjectsAPIService', 'RequirementService']

angular.module('project-creation').controller 'SubmitWorkTypeController', SubmitWorkTypeController
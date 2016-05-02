'use strict'

ProjectDetailsController = ($scope, ProjectsAPIService, SubmitWorkAPIService, CopilotProjectDetailsAPIService) ->
  vm                   = this
  vm.projects          = []
  vm.loading           = false
  vm.id                = $scope.id
  vm.permissions       = $scope.permissions || ['CREATE', 'UPDATE', 'DELETE']
  vm.showConfirmClaim  = false
  vm.showConfirmLaunch = false
  vm.claiming          = false
  vm.claimed           = false
  vm.launching         = false
  vm.launched          = false
  vm.completing        = false
  vm.completed         = false
  vm.estimateAccepted  = false
  vm.isOtherPlatform   = false
  vm.userType          = 'CUSTOMER'
  vm.canUpdate         = vm.permissions?.indexOf('UPDATE') > -1

  vm.textMap  =
    'IOS'        : 'iOS'
    'ANDROID'    : 'Android'
    'WEB_APP'    : 'Web'
    'OTHER'      : 'Other'
    'WATCH'      : 'Watch'
    'PHONE'      : 'Phone'
    'TABLET'     : 'Tablet'
    'DESKTOP'    : 'Desktop'
    'PORTRAIT'   : 'Portrait'
    'LANDSCAPE'  : 'Landscape'
    'FLAT_COLORS': 'FLAT, COLORS'
    'SOLID_LINE' : 'SOLID LINE'
    'THIN_LINE'  : 'THIN LINE'

  vm.imageMap =
    'FLAT_COLORS': require '../../images/icon-flat-color'
    'SOLID_LINE' : require '../../images/icon-solid'
    'THIN_LINE'  : require '../../images/icon-outlined'
    'BLUE'       : require '../../images/colors-blue'
    'RED'        : require '../../images/colors-red'
    'GREEN'      : require '../../images/colors-green'
    'ORANGE'     : require '../../images/colors-orange'

  #TODO: Combine code with launch
  vm.claim = ->
    payload     = id: $scope.id
    params      = userId: $scope.copilotId
    resource    = CopilotProjectDetailsAPIService.post params, payload
    vm.claiming = true

    resource.$promise.then (response) ->
      vm.claimed = true

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.claiming = false

  vm.launch = ->
    params       =
      projectId: $scope.id
      userId   : $scope.copilotId

    payload      = status: 'LAUNCHED'
    resource     = CopilotProjectDetailsAPIService.put params, payload
    vm.launching = true

    resource.$promise.then (response) ->
      vm.launched = true

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.launching = false

  vm.complete = ->
    params       =
      id: $scope.id

    payload      = angular.extend {}, vm.project, {status: 'COMPLETE'}
    resource     = SubmitWorkAPIService.put params, payload
    vm.completing = true

    resource.$promise.then (response) ->
      vm.completed = true

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.completing = false

  mapFonts = (fonts) ->
    mappedFonts = fonts?.map (font) ->
      if font == 'SANS_SERIF'
        'SANS SERIF'
      else
        font

  activate = ->
    $scope.$watch 'copilotId', ->
      vm.userType = 'COPILOT' if $scope.copilotId

    vm.loading = true
    params     = id: $scope.id
    resource   = ProjectsAPIService.get params

    resource.$promise.then (response) ->
      vm.project          = response
      vm.project.fonts    = mapFonts vm.project.fontIds
      vm.claimed          = response.copilotId != 'unassigned'
      vm.launched         = response.status == 'LAUNCHED'
      vm.estimateAccepted = response.status == 'APPROVED'
      vm.completed        = response.status == 'COMPLETE'
      vm.isOtherPlatform  = (response.platformIds.length == 1) && (response.platformIds[0] == 'OTHER')

    resource.$promise.catch (response) ->
      # TODO: handle error

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

ProjectDetailsController.$inject = ['$scope', 'ProjectsAPIService', 'SubmitWorkAPIService', 'CopilotProjectDetailsAPIService']

angular.module('projects').controller 'ProjectDetailsController', ProjectDetailsController

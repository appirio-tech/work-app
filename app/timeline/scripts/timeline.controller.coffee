'use strict'

TimelineController = ($scope, $stateParams, $document, TimelineAPIService, CopilotApprovalAPIService) ->
  vm                        = this
  vm.eventGroups            = []
  vm.permissions            = $scope.permissions || ['CREATE', 'UPDATE', 'DELETE']
  vm.loading                = true
  vm.projectCompletionDate  = null
  vm.finalFixesSubmissionId = null
  vm.completeDesignsStepId  = null
  vm.projectCompleted       = false
  vm.showAcceptQuoteButton  = true
  vm.showImageSlideViewer   = false

  vm.expanded = {}

  vm.isImage = (file) ->
    extension = file.path.substr(-3)
    extension == "png" || extension == "jpg" || extension == 'tif' || extension == 'gif' || extension == "svg"

  vm.acceptQuote = (event) ->
    if vm.copilot?.userId
      params =
        userId: vm.copilot.userId
        projectId: vm.workId

      body =
        "status": "APPROVED"

    resource = CopilotApprovalAPIService.post params, body

    resource.$promise.then (response) ->
      vm.showAcceptQuoteButton = false

      activate()

    resource.$promise.finally ->

  vm.messageUnread = (message) ->
    message.unreadMessageCount > 0

  vm.activateImageSlideViewer = (projectId, reportId, reportDate, fileId) ->
    vm.currentStatusReportId = reportId
    vm.currentStatusReportFileId = fileId
    vm.currentStatusReportDate = reportDate
    vm.showImageSlideViewer = true

  vm.hideImageSlideViewer = ->
    vm.showImageSlideViewer = false

  vm.allMessagesRead = (messages) ->
    unread = messages.filter vm.messageUnread

    unread.length == 0

  configureTimelineEvents = (data) ->
    data.forEach (eventGroup) ->
      if eventGroup.text == 'Project Complete'
        vm.projectCompleted      = true
        vm.projectCompletionDate = eventGroup.createdTime

      else if eventGroup.text == 'Final Fixes'
        eventGroup.events.forEach (event) ->
          if event.type == 'FINALFIXES_SUBMISSION'
            vm.finalFixesSubmissionId = event.submissionId

      else if eventGroup.text == 'Final Designs'
        vm.completeDesignsStepId = eventGroup.workStepId

      else if eventGroup.text == 'Project Submitted'
        eventGroup.events.forEach (event) ->
          if event.type == 'COPILOT_ASSIGNED'
            vm.copilot = event.copilot
            vm.threadId = event.threadId

          if event.type == 'QUOTE_INFO' && event.status == 'Accepted'
            vm.showAcceptQuoteButton = false

  findLastActiveIndex = (eventGroups) ->
    activeGroups = eventGroups.filter (eventGroup) ->
      eventGroup.events.length > 0

    lastIndex = activeGroups.length - 1

    eventGroups.indexOf activeGroups[lastIndex]

  setScrollElement = (index) ->
    angular.element(document).ready ->
      element = angular.element document.getElementById index
      $document.scrollToElement element

  setExpanded = (data) ->
    data.forEach (eventGroup, index) ->
      if eventGroup.events.length == 0
        vm.expanded[index].expanded = false

      else
        lastIndex = findLastActiveIndex(data)
        vm.expanded[lastIndex].expanded = true
        setScrollElement "#{vm.expanded[lastIndex].id}"

  setIndexes = (data) ->
    data.forEach (eventGroup, index) ->
      vm.expanded[index] = {}
      vm.expanded[index].id = index
      vm.expanded[index].expanded = false
      vm.expanded[index].events = {}

      eventGroup.events.forEach (event, eventIndex) ->
        vm.expanded[index].events[eventIndex] = true

  vm.isSubmissionCompleted = (eventGroup) ->
    completed = false

    for e in eventGroup.events
      if e.type == 'WORKSTEP_SUBMITTERS' && e.completed
        completed = true

    completed

  vm.FinalFixesCompleted = (eventGroup) ->
    completed = false

    for e in eventGroup.events
      if e.type == 'STATUS_UPDATE' && (eventGroup.events.indexOf(e) == eventGroup.events.length - 1) && e.header == 'Final Fixes Completed'
        completed = true

    completed

  vm.generateProfileUrl = (handle) ->
    "https://www.topcoder.com/members/#{handle}"

  activate = ->
    vm.workId = $scope.workId

    params =
      workId: vm.workId

    vm.refresh = false

    resource = TimelineAPIService.query params

    resource.$promise.then (data) ->
      vm.refresh = true

      vm.eventGroups = data

      configureTimelineEvents data

      setIndexes data

      setExpanded data


    resource.$promise.catch ->

    resource.$promise.finally ->
      vm.loading = false

    vm

  activate()

TimelineController.$inject = [
  '$scope'
  '$stateParams'
  '$document'
  'TimelineAPIService'
  'CopilotApprovalAPIService'
]

angular.module('appirio-tech-ng-timeline').controller 'TimelineController', TimelineController


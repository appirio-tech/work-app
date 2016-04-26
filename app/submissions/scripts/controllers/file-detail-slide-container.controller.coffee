'use strict'

FileDetailSlideContainerController = ($scope, $state, $filter, DataService, StepSubmissionsService, SubmissionsService) ->
  vm             = this
  vm.loaded      = false
  vm.submission  = {}
  projectId      = $scope.projectId
  stepId         = $scope.stepId
  submissionId   = $scope.submissionId
  fileId         = $scope.fileId
  vm.userType    = $scope.userType
  vm.messagesLoading = false
  vm.messages    = []
  vm.newMessage  = ''

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', projectId, stepId]

  canComment = (role, isOwner, stepType, stepStatus, closed, rank) ->
    # Initialize allow by customer type
    allow = role == 'customer' || role == 'copilot' || isOwner

    # Disable commenting on Complete Designs step
    allow = allow && stepType != 'completeDesigns'

    # Disable commenting on closed steps
    allow = allow && stepStatus != 'CLOSED'

    # Allow commenting on the winning submission of Complete Designs
    allow = allow || (stepType == 'completeDesigns' && closed && rank == 1)

    allow

  render = (step) ->
    vm.loaded     = true
    vm.submission = step.submissions.filter((submission) -> submission.id == submissionId)[0]

    if vm.submission
      vm.hasSubmission   = true
      vm.files           = vm.submission.files
      vm.startingFile    = vm.submission.files.filter((file) -> file.id == fileId)[0]

      if !vm.submissionIdMap && vm.submission
        vm.submissionIdMap = {}
        submissionsCopy = step.submissions.slice()

        ordered = submissionsCopy.sort (previous, next) ->
          new Date(previous.createdAt) - new Date(next.createdAt)

        ordered.forEach (submission, index) ->
          vm.submissionIdMap[submission.id] = index + 1

        vm.submissionNumber = "# #{vm.submissionIdMap[vm.submission.id]}"

      vm.submissionDate         = $filter('timeLapse')(vm.submission.createdAt)
      submitter                 = vm.submission.submitter
      vm.submitterAvatar        = submitter.avatar
      vm.submitterHandle        = submitter.handle
      vm.customerConfirmedRanks = step.details.customerConfirmedRanks
      vm.messages               = vm.startingFile.threads[0]?.messages || []
      vm.canComment             = canComment(vm.userType, vm.submission.belongsToUser, step.stepType, step.status, step.details.customerConfirmedRanks, vm.submission.rank)

  vm.onFileChange = (file) ->
    vm.file = file
    fileId = file.id

    if vm.file.threads[0]
      vm.messages = vm.file.threads[0].messages

      SubmissionsService.getMessages(projectId, stepId, submissionId, fileId).then (res) ->
        vm.messagesLoading = false
        vm.messages = res.messages
        vm.markMessagesAsRead()
    else
      vm.messagesLoading = false
      vm.messages = []


  vm.sendMessage = ->
    if vm.newMessage
      SubmissionsService.sendMessage projectId, stepId, submissionId, vm.file.id, vm.newMessage
      vm.newMessage = ''

  vm.toggleComments = ->
    vm.showMessages = !vm.showMessages

    vm.markMessagesAsRead()

  vm.markMessagesAsRead = ->
    if vm.showMessages and vm.file.unreadMessages > 0
      SubmissionsService.markMessagesAsRead(projectId, stepId, submissionId, vm.file.id)

  activate()

  vm

FileDetailSlideContainerController.$inject = ['$scope', '$state', '$filter', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideContainerController', FileDetailSlideContainerController
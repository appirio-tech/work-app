'use strict'

srv = ($rootScope, StepsAPIService, OptimistCollection) ->
  data = {}

  stepOrder = [
    'designConcepts'
    'completeDesigns'
    'finalFixes'
    'code'
    'codeFinalFixes'
  ]

  statuses = [
    'PLACEHOLDER'
    'SCHEDULED'
    'OPEN'
    'OPEN_LATE'
    'REVIEWING'
    'REVIEWING_LATE'
    'CLOSED'
  ]

  titles =
    designConcepts: 'Design Concepts'
    completeDesigns: 'Complete Designs'
    finalFixes: 'Final Fixes'
    code: 'Development'
    codeFinalFixes: 'Development Final Fixes'

  createOrderedRankList = (rankedSubmissions, numberOfRanks) ->
    orderedRanks = []

    for i in [0...numberOfRanks] by 1
      orderedRanks[i] = null

    rankedSubmissions.forEach (submission) ->
      orderedRanks[submission.rank - 1] = submission.submissionId

    orderedRanks

  removeBlankAfterN = (array, n) ->
    for i in [n...array.length] by 1
      if array[i] == null
        array.splice i, 1
        return array

    array

  updateRankedSubmissions = (rankedSubmissions, numberOfRanks, id, rank) ->
    rankedSubmissions = angular.copy rankedSubmissions
    rank               = rank - 1 # We're in zero-index land

    orderedRanks = createOrderedRankList rankedSubmissions, numberOfRanks
    currentRank  = orderedRanks.indexOf id

    if currentRank >= 0
      orderedRanks.splice currentRank, 1, null

    orderedRanks.splice rank, 0, id

    orderedRanks      = removeBlankAfterN orderedRanks, rank
    rankedSubmissions = []

    orderedRanks.forEach (id, index) ->
      if id != null && index < numberOfRanks
        rankedSubmission =
          rank: index + 1 # Convert back to one-index land
          submissionId: id

        rankedSubmissions.push rankedSubmission

    rankedSubmissions

  statusOf = (step) ->
    if step.stepType
      now              = Date.now()
      startsAt         = new Date(step.startsAt)
      submissionsDueBy = new Date(step.details.submissionsDueBy)
      endsAt           = new Date(step.endsAt)

      hasSubmissions   = step.details.submissionIds?.length > 0
      closed = step.details.customerConfirmedRanks || step.details.customerConfirmedComments || step.details.customerAcceptedFixes || step.details.finalReportSubmitted

      if closed
        'CLOSED'
      else if now > endsAt
        'REVIEWING_LATE'
      else if hasSubmissions
        'REVIEWING'
      else if now > submissionsDueBy
        'OPEN_LATE'
      else if now > startsAt
        'OPEN'
      else
        'SCHEDULED'
    else
      'SCHEDULED'

  statusValueOf = (status) ->
    statuses.indexOf status

  createStepCollection = (projectId) ->
    newSteps = new OptimistCollection
      updateCallback: ->
        $rootScope.$emit "StepsService:changed:#{projectId}"
        data[projectId].get().forEach (step) ->
          $rootScope.$emit "StepsService:changed:#{projectId}:#{step.id}"
      propsToIgnore: ['$promise', '$resolved']

    newSteps

  subscribe = (scope, onChange) ->
    destroyStepsListener = $rootScope.$on "StepsService:changed:#{projectId}", ->
      onChange()

    scope.$on '$destroy', ->
      destroyStepsListener()

    onChange()

  dyanamicProps = (steps) ->
    if angular.isArray(steps)
      steps.map (step) ->
        step.title       = titles[step.stepType]
        step.status      = statusOf step
        step.statusValue = statusValueOf step.status
        step.commentsConfirmed = step.details.customerConfirmedComments
        currentStepOrder = stepOrder.indexOf step.stepType

        if currentStepOrder > 0
          prevStep = steps.filter((step) -> step.stepType == stepOrder[currentStepOrder - 1])[0]

          if prevStep
            step.prevStepId = prevStep.id
            step.prevStepEndsAt = prevStep.endsAt

        if currentStepOrder < stepOrder.length - 1
          nextStep = steps.filter((step) -> step.stepType == stepOrder[currentStepOrder + 1])[0]

          if nextStep
            step.nextStepId = nextStep.id
            step.nextStepStartsAt = nextStep.startsAt

        step

  get = (projectId) ->
    unless data[projectId]
      fetch(projectId)

    dyanamicProps data[projectId].get()

  getCurrentStep = (projectId) ->
    currentStep = null

    filterUnclosed = (step) ->
      step.statusValue > 0 && step.statusValue < 6

    filterDesignConcepts = (step) ->
      step.stepType == 'designConcepts'

    steps = get(projectId)
    unclosed = steps.filter(filterUnclosed)

    if unclosed.length == 0
      currentStep = steps.filter(filterDesignConcepts)[0]
    else
      currentStep = unclosed[0]

    currentStep

  getStepById = (projectId, stepId) ->
    filter = (step) ->
      step.id == stepId

    get(projectId).filter(filter)[0]

  fetch = (projectId) ->
    data[projectId] = createStepCollection(projectId)
    currentProjectId = projectId

    apiCall = () ->
      params =
        projectId: projectId

      StepsAPIService.query(params).$promise

    data[projectId].fetch
      apiCall: apiCall

  updateStep = (projectId, stepId, step, updates) ->
    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.patch(params, updates).$promise

    step.update
      updates: updates
      apiCall: apiCall

  updateRank = (projectId, stepId, submissionId, rank) ->
    step              = data[projectId].findOneWhere { id: stepId }
    stepData          = step.get()
    numberOfRanks     = stepData.details.numberOfRanks
    rankedSubmissions = stepData.details.rankedSubmissions
    rankedSubmissions = updateRankedSubmissions rankedSubmissions, numberOfRanks, submissionId, rank

    updates =
      details:
        rankedSubmissions: rankedSubmissions

    updateStep projectId, stepId, step, updates

  confirmRanks = (projectId, stepId) ->
    step = data[projectId].findOneWhere { id: stepId }
    updates =
      details:
        customerConfirmedRanks: true

    updateStep projectId, stepId, step, updates

  confirmComments = (projectId, stepId) ->
    step = data[projectId].findOneWhere { id: stepId }
    updates =
      details:
        customerConfirmedComments: true

    updateStep projectId, stepId, step, updates

  acceptFixes = (projectId, stepId) ->
    step = data[projectId].findOneWhere { id: stepId }
    updates =
      details:
        customerAcceptedFixes: true

    updateStep projectId, stepId, step, updates

  name:            'StepsService'
  get:             get
  subscribe:       subscribe
  getCurrentStep:  getCurrentStep
  getStepById:     getStepById
  updateRank:      updateRank
  confirmRanks:    confirmRanks
  acceptFixes:     acceptFixes
  confirmComments: confirmComments

srv.$inject = ['$rootScope', 'StepsAPIService', 'OptimistCollection']

angular.module('submissions').factory 'StepsService', srv
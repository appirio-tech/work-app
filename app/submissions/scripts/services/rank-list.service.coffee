'use strict'

srv = ($rootScope, DataService, StepSubmissionsService, SubmissionsService) ->
  data = {}

  rankNames = [
    '1st Place'
    '2nd Place'
    '3rd Place'
    '4th Place'
    '5th Place'
    '6th Place'
    '7th Place'
    '8th Place'
    '9th Place'
    '10th Place'
  ]

  update = (step) ->
    numberOfRanks = Math.min step.details.numberOfRanks, step.submissions?.length

    rankList = [1..numberOfRanks].map (i) ->
      rank =
        value : i
        label : rankNames[i - 1]

      submission = step.submissions.filter((submission) -> submission.rank == i)[0]

      if submission
        angular.extend rank,
          id            : submission.id
          avatarUrl     : submission.submitter.avatar
          handle        : submission.submitter.handle
          belongsToUser : submission.submitter.belongsToUser

      rank

    rankFull = (allFull, rank) ->
      allFull && rank.id

    rankList.allFull   = rankList.reduce rankFull, true
    rankList.confirmed = step.details.customerConfirmedRanks
    rankList.projectId = data[step.id].projectId
    rankList.status    = step.status
    data[step.id]      = rankList

    $rootScope.$emit "RankListService:changed:#{rankList.projectId}:#{step.id}"

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'RankListService.get requires a projectId and a stepId'

    unless data[stepId]
      data[stepId] = []
      data[stepId].projectId = projectId

      DataService.subscribe null, update, [
        [StepSubmissionsService, 'get', projectId, stepId]
      ]

    data[stepId]

  name         : 'RankListService'
  get          : get

srv.$inject = ['$rootScope', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('submissions').factory 'RankListService', srv
'use strict'

srv = ($rootScope, $state, StepsService, SubmissionsService, DataService) ->
  projectIdsByStepId = {}
  data               = {}

  submissionWithRank = (submission, rankedSubmissions = []) ->
    submission.rank = ''
    rankedSubmissions.forEach (rankedSubmission) ->
      if submission.id == rankedSubmission.submissionId
        submission.rank = rankedSubmission.rank

    submission

  submissionsWithRanks = (submissions, rankedSubmissions = []) ->
    submissions.map (submission) ->
      submissionWithRank submission, rankedSubmissions

  sortSubmissions = (submissions) ->
    ranked = submissions.filter (submission) ->
      submission.rank != ''

    unRanked = submissions.filter (submission) ->
      submission.rank == ''

    orderedByRank = ranked.sort (previousSubmission, nextSubmission) ->
      return previousSubmission.rank - nextSubmission.rank

    orderedBySubmitter = unRanked.sort (previousSubmission, nextSubmission) ->
      previousSubmission.submitter.id - nextSubmission.submitter.id

    orderedSubmissions = orderedByRank.concat orderedBySubmitter
    orderedSubmissions

  update = (step, submissions) ->
    data[step.id]    = step
    step.projectId   = projectIdsByStepId[step.id]
    submissions      = submissionsWithRanks submissions, step.details.rankedSubmissions
    submissions      = sortSubmissions submissions

    submissions = submissions.map (submission) ->
      submission.detailUrl = $state.href 'submission-detail',
        projectId    : step.projectId
        stepId       : step.id
        submissionId : submission.id

      #remove non-image files and thumbnail-sized duplicates of larger preview files for non-code phases
      filteredFiles = submission.files.filter (file) ->
        pattern = new RegExp('image.*')
        isImage = pattern.test file.type
        file.role != 'PREVIEW_SMALL' && isImage

      isCodeStep = step.stepType == 'code' || step.stepType == 'finalCodeFixes'
      submissionFiles = if isCodeStep then submission.files else filteredFiles

      submission.files = submissionFiles.map (file) ->
        file.detailUrl = $state.href 'file-detail',
          projectId    : step.projectId
          stepId       : step.id
          submissionId : submission.id
          fileId       : file.id

        file

      submission

    step.submissions = submissions

    step.fileCount = submissions.reduce ((a, s) -> a + s.files.length), 0

    $rootScope.$emit "StepSubmissionsService:changed:#{step.projectId}:#{step.id}"

  get = (projectId, stepId) ->
    unless data[stepId]
      projectIdsByStepId[stepId] = projectId
      data[stepId] = {}

      DataService.subscribe null, update, [
        [StepsService, 'getStepById', projectId, stepId]
        [SubmissionsService, 'get', projectId, stepId]
      ]

    angular.merge {}, data[stepId]

  name : 'StepSubmissionsService'
  get  : get

srv.$inject = ['$rootScope', '$state', 'StepsService', 'SubmissionsService', 'DataService']

angular.module('submissions').factory 'StepSubmissionsService', srv
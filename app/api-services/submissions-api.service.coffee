'use strict'

transform = require './transform.js'

srv = ($resource, WORK_API_URL) ->
  url = WORK_API_URL + '/projects/:projectId/steps/:stepId/submissions/:submissionId'

  params =
    projectId   : '@projectId'
    stepId      : '@stepId'
    submissionId: '@submissionId'

  methods =
    get:
      transformResponse: transform
    query:
      transformResponse: transform
      isArray          : true

  $resource url, params, methods

srv.$inject = ['$resource', 'WORK_API_URL']

angular.module('appirio-tech-ng-api-services').factory 'SubmissionsAPIService', srv
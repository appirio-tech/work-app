'use strict'

window.__karma__.loaded = ->
  # prevent karma from starting
  SwaggerFakeServer.init()

  SwaggerFakeServer.fakeServer.respondImmediately = true

  schema = __fixtures__['work-api-schema/work-api-schema']

  SwaggerFakeServer.consume schema, window.__karma__.start

stash = {}

window.stashIt = (obj, key) ->
  stash[key] = obj[key]

window.unstashIt = (obj, key) ->
  obj[key] = stash[key]

  delete stash[key]

window.context = window.describe

beforeEach ->
  module 'app.layout'
  module 'app.submit-work'
  module 'app.core'
  module 'app.manage'

# Mock http request for angular
getPayload = (method, path) ->
  for pathRegex, methods of window.MockApi
    regex = new RegExp pathRegex

    if path.match regex
      return methods[method]

beforeEach inject ($httpBackend) ->
  for pathRegex, methods of window.MockApi
    for method, payload of methods
      regex = new RegExp pathRegex

      $httpBackend.when(method, regex).respond (method, path) ->
        payload = getPayload method, path

        if $.isArray payload
          clonedPayload = payload.slice 0
        else if $.isPlainObject payload
          clonedPayload = $.extend {}, payload
        else
          clonedPayload = payload

        [
          $httpBackend.responseCode || 200
          clonedPayload
          {}
        ]

'use strict'

stash = {}

window.stashIt = (obj, key) ->
  stash[key] = obj[key]

window.unstashIt = (obj, key) ->
  obj[key] = stash[key]

  delete stash[key]

window.__karma__.loaded = ->
  # prevent karma from starting
  AutoConfigFakeServer.init()

  AutoConfigFakeServer.fakeServer.respondImmediately = true

  fixtures = []

  for key, fixture of window.FIXTURES
    # apiary/messaging14.json needs to be updated on apiary
    fixtures.push fixture unless key == 'apiary/messaging14.json'

  AutoConfigFakeServer.consume fixtures

  window.__karma__.start()

beforeEach ->
  module 'app'

# Transfer fakeserver responses to $httpBackend
beforeEach inject ($httpBackend) ->
  responses = window.AutoConfigFakeServer?.fakeServer?.responses

  if responses
    for response in responses
      upperCaseMethod = response.method.toUpperCase()
      request         = $httpBackend.when upperCaseMethod, response.url

      request.respond response.response[0], response.response[2]

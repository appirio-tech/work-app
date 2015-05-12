'use strict'

srv       = null
timeline  = null

describe 'TimelineService', ->
  beforeEach inject (TimelineService, $httpBackend) ->
    srv = TimelineService
    params =
      workId: 123

    srv.getEvents params, (response) ->
      timeline = response

    $httpBackend.flush()

  it "should have an array of events", ->
    expect(timeline.events.length).to.be.ok

  it "should have a submitted date", ->
    expect(timeline.submittedDate).to.be.equal '2015-05-05T20:53:41.467Z'
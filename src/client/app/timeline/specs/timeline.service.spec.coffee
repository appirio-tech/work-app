'use strict'

timeline  = null

describe 'TimelineService', ->
  beforeEach inject (TimelineService, $httpBackend) ->
    params =
      workId: 123

    TimelineService.getEvents params, (response) ->
      timeline = response

    $httpBackend.flush()

  it "should have an array of events", ->
    expect(timeline.events.length).to.be.ok

  it "should have a submitted date", ->
    expect(timeline.submittedDate).to.be.equal '2015-05-05T20:53:41.467Z'
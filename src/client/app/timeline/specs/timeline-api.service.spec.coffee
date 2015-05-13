'use strict'

srv    = null
events = null

describe 'TimelineAPIService', ->
  beforeEach inject (TimelineAPIService) ->
    srv = TimelineAPIService

  it 'should have a query method', ->
    expect(srv.query).to.be.isFunction

  describe 'TimelineAPIService.query', ->
    beforeEach inject ($httpBackend) ->
      params =
        workId: '123'

      srv.query(params).$promise.then (response) ->
        events = response

      $httpBackend.flush()

    it 'should have at some results', ->
      expect(events.length).to.be.ok

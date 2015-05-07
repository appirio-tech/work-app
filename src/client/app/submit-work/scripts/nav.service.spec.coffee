'use strict'

navServ = null

describe.only 'NavService', ->

  beforeEach inject (NavService) ->
    navServ = NavService

  it 'should be defined', ->
    expect(navServ).to.be.defined

  describe 'find state', ->
    it 'should return correct state', ->
      expect(navServ.findState 'name').to.eql('key': 'name' )


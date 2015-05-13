'use strict'

navServ = null
scope = null

describe.only 'NavService', ->

  beforeEach inject ($rootScope, NavService) ->
    navServ = NavService
    scope = $rootScope

  it 'should be defined', ->
    expect(navServ).to.be.defined

  describe 'find state', ->
    context 'when state is valid', ->
      beforeEach ->
        state = navServ.findState 'name'

      it 'should return correct state', ->
        expect(navServ.findState 'name').to.eql('key': 'name')

  describe 'set active state', ->
    context 'when state is a string', ->
      beforeEach ->
        navServ.findState 'type'

      it 'should set correct active state', ->
        activeState = navServ.activeState
        expect(navServ.activeState).to.equal('type')
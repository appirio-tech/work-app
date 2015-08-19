'use strict'

spy            = null
stateService   = null
authService    = null
isLoggedInStub = null

describe 'Check permission during a state change', ->
  beforeEach inject ($state, AuthService) ->
    spy          = sinon.spy $state, 'go'
    stateService = $state
    authService  = AuthService

  context 'when going to a protected state', ->
    context 'when a user is logged in', ->
      beforeEach ->
        stateService.go 'messaging', id: 123

        true

      afterEach ->
        spy.restore()

      it 'should have called state go once', ->
        expect(spy.calledOnce).to.be.ok

    context 'when a user is not logged in', ->
      beforeEach inject (AuthService) ->
        isLoggedInStub = sinon.stub AuthService, 'isLoggedIn', ->
          false

        stateService.go 'messaging', id: 123

        true

      afterEach ->
        spy.restore()
        isLoggedInStub.restore()

      it 'should have called state go with login', ->
        wentToLogin = spy.calledWith 'login'

        expect(wentToLogin).to.be.ok


'use strict'

spy            = null
stateService   = null
authService    = null
isLoggedInStub = null
auth           = null

describe 'Check permission during a state change', ->
  beforeEach inject ($state, AuthService, auth) ->
    spy          = sinon.spy $state, 'go'
    stateService = $state
    authService  = AuthService
    auth         = auth

  afterEach ->
    spy.restore()
    isLoggedInStub?.restore?()

  context 'when going to a protected state', ->
    context 'when a user is logged in', ->
      beforeEach ->
        auth =
          isAuthenticated: true

        stateService.go 'messaging', id: 123

        true

      it 'should have called state go once', ->
        expect(spy.called).to.be.ok

    context 'when a user is not logged in', ->
      beforeEach inject ->
        isLoggedInStub = sinon.stub authService, 'isLoggedIn', ->
          false

        stateService.go 'messaging', id: 123

        true

      it 'should have called state go with login', ->
        wentToLogin = spy.calledWith 'login'

        expect(wentToLogin).to.be.ok


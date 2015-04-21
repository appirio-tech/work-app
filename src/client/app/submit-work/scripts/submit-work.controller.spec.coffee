'use strict'

scope          = null
submitWorkServ = null
stateSpy       = null

describe 'SubmitWorkController', ->
  beforeEach inject ($controller, $rootScope, SubmitWorkService, $state) ->
    scope          = $rootScope.$new()
    submitWorkServ = SubmitWorkService
    stateSpy       = sinon.spy $state, 'go'

    stashIt submitWorkServ, 'states'
    stashIt submitWorkServ, 'activeState'
    stashIt submitWorkServ, 'completed'

    # Allow manipulation of states
    submitWorkServ.states = []

    for state in ['name', 'type']
      submitWorkServ.states.push
        key: state,
        form:
          '$valid': true
          '$setDirty': ->
            true

    $controller 'SubmitWorkController', $scope: scope

  afterEach ->
    stateSpy.restore()
    unstashIt submitWorkServ, 'states'
    unstashIt submitWorkServ, 'activeState'
    unstashIt submitWorkServ, 'completed'

  it 'should define activeState', ->
    expect(scope.activeState).to.isDefined

  it 'should define work', ->
    expect(scope.work).to.isDefined

  it 'should define completed', ->
    expect(scope.completed).to.isDefined

  it 'should define asideService', ->
    expect(scope.asideService).to.isDefined

  describe 'watch service to set active state', ->
    beforeEach inject ->
      submitWorkServ.activeState = 'type'
      scope.$apply()

    it 'should set activeState to "type"', ->
      expect(scope.activeState).to.equal 'type'

  describe 'watch service to set completed', ->
    beforeEach inject ->
      submitWorkServ.completed = true
      scope.$apply()

    it 'should set completed to true', ->
      expect(scope.completed).to.ok

  describe 'launch work', ->
    context 'when all forms are valid', ->
      beforeEach inject ->
        scope.launch()

      it 'should set state to "launch-success"', ->
        stateSpy.calledWith('launch-success').should.ok

    context 'when a form is invalid', ->
      beforeEach inject ->
        submitWorkServ.states[1].form.$valid = false
        scope.launch()
        scope.$apply()

      it 'should set activeState to "type"', ->
        expect(scope.activeState).to.equal 'type'

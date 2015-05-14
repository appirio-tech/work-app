'use strict'

controller        = null
scope          = null
state          = null
# activeState    = null
# saveSpy        = null
# submitWorkServ = null
# nextState      = null
# defaultCompleted = null

describe.only 'SubmitBriefController', ->

  beforeEach inject ($rootScope, $log, $controller) ->
    scope = $rootScope.$new()
    controller = $controller 'SubmitBriefController', $scope: scope
    $rootScope.$apply()

  describe 'Brief controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

  describe 'after active', ->
    it 'should have a title of Brief', ->
      expect(controller.title).to.equal('Brief')

  describe 'toggle yes', ->
    beforeEach ->
      controller.toggleYes()

    it 'should set "showYesNo" to false', ->
      expect(controller.showYesNo).to.equal(false)

    it 'should set "showBrief" to true', ->
      expect(controller.showBrief).to.equal(true)

    it 'should set "showElevator" to false', ->
      expect(controller.showElevator).to.equal(false)
  #   context 'when state is a string', ->
  #     beforeEach ->
  #       saveSpy = sinon.spy submitWorkServ, 'save'
  #       navServ.setActiveState 'type'
  #       activeState = navServ.activeState

  #     it 'should call save on submitWorkService', ->
  #       expect(saveSpy).to.have.been.called

  #     it 'should set correct active state', ->
  #       expect(activeState).to.equal('type')

  #   context 'when state is an object', ->
  #     beforeEach ->
  #       saveSpy = sinon.spy submitWorkServ, 'save'
  #       navServ.setActiveState 'key': 'type'
  #       activeState = navServ.activeState

  #     afterEach ->
  #       saveSpy.restore()

  #     it 'should call save on submitWorkService', ->
  #       expect(saveSpy).to.have.been.called

  #     it 'should set correct active state', ->
  #       expect(activeState).to.equal('type')

  # describe 'set next state', ->
  #   context 'when current state is the first state', ->
  #     beforeEach ->
  #       nextState = navServ.setNextState()

  #     it 'should set the next state to "type"', ->
  #       expect(nextState).to.equal('type')

  #   context 'when current state is "features"', ->
  #     beforeEach ->
  #       navServ.setActiveState('features')
  #       nextState = navServ.setNextState()

  #     it 'should set the next state to "designs"', ->
  #       expect(nextState).to.equal('designs')

  # describe 'reset', ->
  #   beforeEach ->
  #       navServ.reset()
  #       state  = navServ.activeState
  #       defaultCompleted =
  #         aboutProject : false
  #         users        : false
  #         features     : false
  #         design       : false
  #         launch       : false

  #   it 'should set active state to "name"', ->
  #     expect(state).to.equal('name')

  #   it 'should reset "completed" to "defaultCompleted"', ->
  #     expect(navServ.completed).to.eql(defaultCompleted)


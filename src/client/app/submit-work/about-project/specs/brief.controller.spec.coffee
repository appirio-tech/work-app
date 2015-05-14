'use strict'

controller        = null
scope          = null
state          = null
navServ = null
navServBriefState = null
setNextStateSpy = null
# navServ.findState 'brief'.form = null
# activeState    = null
# saveSpy        = null
# submitWorkServ = null
# nextState      = null
# defaultCompleted = null

describe.only 'SubmitBriefController', ->

  beforeEach inject ($rootScope, $log, $controller, NavService) ->
    navServ = NavService
    navServBriefState = navServ.findState 'brief'
    setNextStateSpy = sinon.spy navServ, 'setNextState'
    scope = $rootScope.$new()
    scope.briefForm = "project brief"
    scope.elevatorForm = "elevator pitch"
    scope.questionForm = "question"
    controller = $controller 'SubmitBriefController', $scope: scope
    $rootScope.$apply()

  describe 'Brief controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

  describe 'after active', ->
    it 'should have a title of Brief', ->
      expect(controller.title).to.equal('Brief')

  describe 'toggleYes', ->
    beforeEach ->
      controller.toggleYes()
      scope.$apply()

    it 'should set "showYesNo" to false', ->
      expect(controller.showYesNo).to.equal(false)

    it 'should set "showBrief" to true', ->
      expect(controller.showBrief).to.equal(true)

    it 'should set "showElevator" to false', ->
      expect(controller.showElevator).to.equal(false)

    it 'should set "brief" state form on NavService to "briefForm"', ->
      expect(navServBriefState.form).to.equal('project brief')

    describe 'toggleNo', ->
      beforeEach ->
        controller.toggleNo()
        scope.$apply()

      it 'should set "showYesNo" to false', ->
        expect(controller.showYesNo).to.equal(false)

      it 'should set "showBrief" to false', ->
        expect(controller.showBrief).to.equal(false)

      it 'should set "showElevator" to true', ->
        expect(controller.showElevator).to.equal(true)

      it 'should set "brief" state form on NavService to "elevatorForm"', ->
        expect(navServBriefState.form).to.equal('elevator pitch')

    describe 'toggleCancel', ->
      beforeEach ->
        controller.toggleCancel()
        scope.$apply()

      it 'should set "question" to null', ->
        expect(controller.question).to.equal(null)

      it 'should set "showYesNo" to true', ->
        expect(controller.showYesNo).to.equal(true)

      it 'should set "showBrief" to false', ->
        expect(controller.showBrief).to.equal(false)

      it 'should set "showElevator" to false', ->
        expect(controller.showElevator).to.equal(false)

      it 'should set "brief" state form on NavService to "questionForm"', ->
        expect(navServBriefState.form).to.equal('question')

    describe 'submitElevator', ->
      beforeEach ->
        controller.submitElevator()
        scope.$apply()

      afterEach ->
        setNextStateSpy.restore()

      context 'when elevatorForm is valid', ->
        beforeEach ->
          scope.elevatorForm =
            $valid: true

      it 'should call setNextState on NavService', ->
        expect(setNextStateSpy).to.have.been.called

      context 'when elevatorForm is invalid', ->
        beforeEach ->
          scope.elevatorForm =
            $valid: true
          setNextStateSpy = sinon.spy navServ, 'setNextState'

        it 'should not call setNextState on NavService'
        expect(setNextStateSpy).not.to.have.been.called

  # describe 'toggleNo', ->
  #   beforeEach ->
  #     scope.elevatorForm = "elevator pitch"
  #     controller.toggleNo()

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


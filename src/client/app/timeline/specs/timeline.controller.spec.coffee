'use strict'

controller = null

describe 'TimelineController', ->
  beforeEach inject ($rootScope, $controller, $httpBackend) ->
    scope      = $rootScope.$new()
    controller = $controller 'TimelineController', $scope: scope

    $httpBackend.flush()

  it 'should have submittedDate defined', ->
    expect(controller.submittedDate).to.be.ok

  it 'should have quotedDate defined', ->
    expect(controller.quotedDate).to.be.ok

  it 'should have coPilotedDate defined', ->
    expect(controller.coPilotedDate).to.be.ok


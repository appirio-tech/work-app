'use strict'

controller = null

describe.only 'TimelineController', ->
  beforeEach inject ($rootScope, $controller, $httpBackend) ->
    scope      = $rootScope.$new()
    controller = $controller 'TimelineController', $scope: scope

    $httpBackend.flush()

  it 'should have submittedDate defined', ->
    expect(controller.submittedDate).to.be.ok

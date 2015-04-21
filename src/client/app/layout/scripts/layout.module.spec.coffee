'use strict'

rootScope = null

describe 'layout module', ->
  describe 'setPageClass', ->
    beforeEach inject ($rootScope, $location) ->
      rootScope = $rootScope

      stashIt $location, '$$url'
      stashIt $location, '$$path'

      $location.$$url = $location.$$path = '/howdy'

      $rootScope.$broadcast '$locationChangeStart'

    afterEach inject ($location) ->
      unstashIt $location, '$$url'
      unstashIt $location, '$$path'

    it 'should set pageClass to howdy', ->
      expect(rootScope.pageClass).to.equal ' howdy'

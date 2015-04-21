'use strict'

rootScope = null

describe.only 'layout module', ->
  describe 'setPageClass', ->
    beforeEach inject ($rootScope, $location) ->
      rootScope = $rootScope

      stashIt $location, '$$url'

      $location.$$path = '/howdy'

      $rootScope.$broadcast '$locationChangeStart'

    afterEach inject ($location) ->
      unstashIt $location, '$$url'

    it 'should set pageClass to howdy', ->
      expect(rootScope.pageClass).to.equal ' howdy'
